<template>
  <div>
    <h1>{{ currentWord }}</h1>
    <p ref="points" class="points">
      {{ points }} <span v-if="points === 1">point</span>
      <span v-else>points</span>
    </p>
    <div v-if="choices.length === numberOfChoices">
      <div v-for="{ definition, partOfSpeech } in choices" v-bind:key="definition">
        <button v-on:click="() => guess(definition)">{{ definition }} ({{ partOfSpeech }})</button>
      </div>
    </div>
    <div v-else>
      loading next word...
    </div>
  </div>
</template>

<script>
import wordList from '../assets/wordList';
import api from '../../api';

export default {
  name: 'Game',
  data: () => {
    return {
      currentWord: '',
      dictionary: {},
      choices: [],
      numberOfChoices: 3,
      points: 0
    };
  },
  methods: {
    generateRandomWord: function() {
      const { words } = wordList;
      const randomWord = words[Math.random() * words.length | 0];
      let wordExists = false;

      this.choices.forEach(choice => {
        if(choice.word === randomWord) wordExists = true;
      });

      if(wordExists){
        return this.generateRandomWord();
      } else return randomWord;
    },
    generateDictionary: async function(){
      this.choices = [];
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
    },
    guess: function(guessedDefinition) {
      const { definitions } = this.dictionary[this.currentWord];
      if(definitions.some(({ definition }) => definition === guessedDefinition)){
        this.points++;
        this.$refs.points.style.background = '#14f396';
        setTimeout(() => {
          this.$refs.points.style.background = 'initial';
        }, 300);
      }

      this.generateDictionary();
    }
  },
  created: function () {
    this.generateDictionary();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.points{
  padding: 0.5rem;
  width: fit-content;
  margin: 1rem auto;
  border-radius: 6px;
  transition: background 300ms;
}
</style>
