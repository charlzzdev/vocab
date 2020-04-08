<template>
  <div id="game">
    <h1>{{ currentWord }}</h1>
    <p ref="points" class="points">
      {{ points }} <span v-if="points === 1">point</span>
      <span v-else>points</span>
    </p>
    <div v-if="choices.length === numberOfChoices && !info.show">
      <div v-for="({ definition, partOfSpeech }, index) in choices" v-bind:key="definition">
        <button 
          v-bind:id="'btn-'+(index+1)"
          class="full-width-btn"
          v-on:click="() => guess(definition)"
        >
          {{ definition }} ({{ partOfSpeech }})
          <span class="key-indicator">{{ index+1 }}</span>
        </button>
      </div>
    </div>
    <Info
      v-else-if="info.show"
      v-bind:title="info.title"
      v-bind:text="info.text"
      v-bind:generateDictionary="generateDictionary"
    />
    <div v-else>
      loading next word...
    </div>
  </div>
</template>

<script>
import Info from './Info';
import wordList from '../assets/wordList';
import api from '../../api';

export default {
  name: 'Game',
  components: { Info },
  data: () => {
    return {
      currentWord: '',
      dictionary: {},
      choices: [],
      numberOfChoices: 3,
      points: 0,
      info: { show: false, title: '', text: '' }
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
    },
    guess: function(guessedDefinition) {
      const { definitions } = this.dictionary[this.currentWord];
      if(definitions.some(({ definition }) => definition === guessedDefinition)){
        this.points++;
        this.$refs.points.style.background = '#14f396';
        setTimeout(() => {
          this.$refs.points.style.background = 'initial';
        }, 300);

        this.generateDictionary();
      } else {
        this.choices.forEach(choice => {
          if(choice.word === this.currentWord){
            this.info = {
              show: true,
              title: `${choice.word} (${choice.partOfSpeech}) means:`,
              text: choice.definition
            };
          }
        });
      }
    }
  },
  created: function () {
    this.generateDictionary();

    document.addEventListener('keyup', e => {
      const button = document.getElementById(`btn-${e.key}`);
      button?.click();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game{
  background: #f9f9f9;
  max-width: 500px;
  margin: 5rem auto;
  padding: 2rem 1rem;
  border-radius: 6px;
  box-shadow: 0 0 50px #e2e2e2;
}
h1{
  margin-top: 0;
}
.points{
  padding: 0.5rem;
  width: fit-content;
  margin: 1rem auto;
  border-radius: 6px;
  transition: background 300ms;
}
</style>
