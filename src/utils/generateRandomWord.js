import wordList from '../assets/wordList';

export default function() {
  const { words } = wordList;
  const randomWord = words[Math.random() * words.length | 0];
  let wordExists = false;

  this.choices.forEach(choice => {
    if(choice.word === randomWord) wordExists = true;
  });

  if(wordExists){
    return this.generateRandomWord();
  } else return randomWord;
}
