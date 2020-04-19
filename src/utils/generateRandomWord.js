import wordList from '../assets/wordList';
import store from '../store';

function generateRandomWord(choices) {
  const { words } = wordList;
  const randomWord = words[Math.random() * words.length | 0];
  const userPointsByWord = store.state.user.data.points.byWord;
  let wordExists = Object.entries(userPointsByWord).some(
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
