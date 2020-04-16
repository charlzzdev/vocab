import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../index';

import api from '../../../api.json';
import generateRandomWord from '../../utils/generateRandomWord';

const state = {
  gameStarted: false,
  savingToFirebase: false,
  round: 0,
  currentWord: '',
  dictionary: {},
  choices: [],
  numberOfChoices: 3,
  points: {
    overall: 0,
    byWord: {}
  },
  secondsSpent: 0,
  secondsSpentCounter: null,
  info: { show: false, title: '', text: '' }
};

const actions = {
  setGameReady: ({ state }) => {
    state.secondsSpentCounter = setInterval(() => state.secondsSpent++, 1000);
    state.gameStarted = true;
  },
  startNextRound: async ({ state, commit }) => {
    if(state.round >= 3) {
      commit('endGameAndSaveData');
      return;
    }

    state.choices = [];
    state.info.show = false;
    state.round++;

    for(let i = 0; i < state.numberOfChoices; i++){
      const randomWord = generateRandomWord(state.choices);

      if(!state.dictionary[randomWord]){
        const res = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${randomWord}/definitions`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": api.key
          }
        });
        const data = await res.json();

        if(!res.ok) {
          state.info = {
            show: true,
            title: 'An error occurred:',
            text: data.message || data.msg
          };
          return;
        }

        state.dictionary = {
          ...state.dictionary,
          [randomWord]: {
            randomWord,
            definitions: data.definitions
          }
        };
      }

      const { definitions } = state.dictionary[randomWord];
      const { definition, partOfSpeech } = definitions[Math.random()*definitions.length|0];

      state.choices = [
        ...state.choices,
        {
          word: randomWord,
          definition,
          partOfSpeech
        }
      ];
    }

    state.currentWord = state.choices[Math.random()*state.choices.length|0].word;
  },
  guess: ({ state, dispatch }, guessedDefinition) => {
    const { definitions } = state.dictionary[state.currentWord];

    if(definitions.some(({ definition }) => definition === guessedDefinition)){
      state.points.overall++;
      state.points.byWord[state.currentWord] = state.points.byWord[state.currentWord]+1 || 1;
      document.getElementById('pointsRef').style.background = '#14f396';
      setTimeout(() => {
        document.getElementById('pointsRef').style.background = 'initial';
      }, 300);

      dispatch('startNextRound');
    } else {
      state.choices.forEach(choice => {
        if(choice.word === state.currentWord){
          state.info = {
            show: true,
            title: `${choice.word} (${choice.partOfSpeech}) means:`,
            text: choice.definition
          };
        }
      });
    }
  },
};

const mutations = {
  endGameAndSaveData: async (state) => {
    const { user } = store.state;
    const userStats = { ...user.data };

    state.gameStarted = false;
    state.savingToFirebase = true;
    state.currentWord = 'Saving stats...';

    clearInterval(state.secondsSpentCounter);

    userStats.secondsSpent += state.secondsSpent;
    userStats.gamesPlayed++;
    Object.entries(state.points.byWord).forEach(([word, points]) => {
      userStats.points.overall += points;
      userStats.points.byWord[word] = userStats.points.byWord[word] + points || points;
    });

    await firebase.firestore()
      .collection('vocab')
      .doc(user.data.email)
      .set(userStats);

    state.round = 0;
    state.points = { overall: 0, byWord: {} };
    state.currentWord = '';
    state.secondsSpent = 0;
    state.savingToFirebase = false;
  }
};

export default {
  state,
  actions,
  mutations
};
