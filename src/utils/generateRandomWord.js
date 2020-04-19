import wordList from '../assets/wordList';
import store from '../store';

function generateRandomWord(choices) {
  const { words } = wordList;
  const { points, recentlyMistakenWords } = store.state.user.data;

  const randomMistakenWord = recentlyMistakenWords[Math.random() * recentlyMistakenWords.length | 0];
  const randomUnknownWord = words[Math.random() * words.length | 0];
  const randomWord = !randomMistakenWord
    || points.byWord[randomMistakenWord] >= 3
    || choices.some(choice => choice.word === randomMistakenWord)
    ? randomUnknownWord : (Math.random() > 0.5 ? randomMistakenWord : randomUnknownWord);

  let wordExists = Object.entries(points.byWord).some(
    ([word, points]) => word === randomWord && points >= 3
  );

  choices.forEach(choice => {
    if(choice.word === randomWord) wordExists = true;
  });

  if(wordExists){
    return generateRandomWord(choices);
  } else return randomWord;
}

export default generateRandomWord;
