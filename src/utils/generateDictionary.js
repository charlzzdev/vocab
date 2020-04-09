import api from "../../api";

export default async function() {
  this.choices = [];
  this.info.show = false;

  for(let i = 0; i < this.numberOfChoices; i++){
    const randomWord = this.generateRandomWord();

    if(!this.dictionary[randomWord]){
      const res = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${randomWord}/definitions`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": api.key
        }
      });
      const data = await res.json();

      if(!res.ok) {
        this.info = {
          show: true,
          title: 'An error occurred:',
          text: data.message || data.msg
        };
        return;
      }

      this.dictionary = {
        ...this.dictionary,
        [randomWord]: {
          word: randomWord,
          definitions: data.definitions
        }
      };
    }

    const { definitions } = this.dictionary[randomWord];
    const { definition, partOfSpeech } = definitions[Math.random()*definitions.length|0];
    this.choices = [
      ...this.choices,
      {
        word: randomWord,
        definition,
        partOfSpeech
      }
    ];
  }

  this.currentWord = this.choices[Math.random()*this.choices.length|0].word;
}
