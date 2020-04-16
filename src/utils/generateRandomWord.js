import wordList from '../assets/wordList';

function generateRandomWord(choices) {
  const { words } = wordList;
  const randomWord = words[Math.random() * words.length | 0];
  let wordExists = false;

  choices.forEach(choice => {
    if(choice.word === randomWord) wordExists = true;
  });

  if(wordExists){
    return generateRandomWord();
  } else return randomWord;
}

export default generateRandomWord;
