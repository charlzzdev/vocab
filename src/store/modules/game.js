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
  setGameReady: ({ commit }) => {
    commit('startCounter');
  },
  startNextRound: async ({ state, commit, dispatch }) => {
    if(state.round >= 10) {
      dispatch('endGameAndSaveData');
      return;
    }

    commit('prepareNextRound');

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
          commit('setInfo', {
            show: true,
            title: 'An error occurred:',
            text: data.message || data.msg
          });
          return;
        }

        commit('addWordToDictionary', {
          word: randomWord,
          definitions: data.definitions
        });
      }

      const { definitions } = state.dictionary[randomWord];
      const { definition, partOfSpeech } = definitions[Math.random()*definitions.length|0];

      commit('addWordToChoices', {
        word: randomWord,
        definition,
        partOfSpeech
      });
    }

    commit('setCurrentWord', state.choices[Math.random()*state.choices.length|0].word);
  },
  guess: ({ state, commit, dispatch }, guessedDefinition) => {
    const { definitions } = state.dictionary[state.currentWord];

    if(definitions.some(({ definition }) => definition === guessedDefinition)){
      commit('incrementPoints');

      document.getElementById('pointsRef').style.background = '#14f396';
      setTimeout(() => {
        document.getElementById('pointsRef').style.background = 'initial';
      }, 300);

      dispatch('startNextRound');
    } else {
      state.choices.forEach(choice => {
        if(choice.word === state.currentWord){
          commit('setInfo', {
            show: true,
            title: `${choice.word} (${choice.partOfSpeech}) means:`,
            text: choice.definition
          });
        }
      });
    }
  },
  endGameAndSaveData: async ({ state, commit }) => {
    const { user } = store.state;
    const userStats = { ...user.data };

    commit('prepareToEndGame');

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

    commit('resetGameState');
  }
};

const mutations = {
  startCounter: (state) => {
    state.secondsSpentCounter = setInterval(() => state.secondsSpent++, 1000);
    state.gameStarted = true;
  },
  prepareNextRound: (state) => {
    state.choices = [];
    state.info.show = false;
    state.round++;
  },
  addWordToDictionary: (state, { word, definitions }) => {
    state.dictionary = {
      ...state.dictionary,
      [word]: {
        word,
        definitions
      }
    };
  },
  addWordToChoices: (state, choice) => {
    state.choices = [
      ...state.choices,
      choice
    ];
  },
  setCurrentWord: (state, word) => {
    state.currentWord = word;
  },
  incrementPoints: (state) => {
    state.points.overall++;
    state.points.byWord[state.currentWord] = state.points.byWord[state.currentWord]+1 || 1;
  },
  setInfo: (state, info) => {
    state.info = info;
  },
  prepareToEndGame: (state) => {
    state.gameStarted = false;
    state.savingToFirebase = true;
    state.currentWord = 'Saving stats...';
    clearInterval(state.secondsSpentCounter);
  },
  resetGameState: (state) => {
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
