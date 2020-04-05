<template>
  <div>
    <h1>{{ currentWord }}</h1>
    <p ref="points" class="points">
      {{ points }} <span v-if="points === 1">point</span>
      <span v-else>points</span>
    </p>
    <div v-for="{ word, definition } in dictionary" v-bind:key="word">
      <button v-on:click="guess">{{ definition }} ({{word}})</button>
    </div>
  </div>
</template>

<script>
import wordList from '../assets/wordList';

export default {
  name: 'Game',
  data: () => {
    return {
      currentWord: '',
      dictionary: [],
      points: 0
    };
  },
  methods: {
    generateRandomWord: function() {
      const { words } = wordList;
      const randomWord = words[Math.random() * words.length | 0];
      let wordExists = false;

      this.dictionary.forEach(d => {
        if(d.word === randomWord) wordExists = true;
      });

      if(wordExists){
        return this.generateRandomWord();
      } else return randomWord;
    },
    generateDictionary: function(){
      this.dictionary = [];
      for(let i = 0; i < 3; i++){
        this.dictionary = [
          ...this.dictionary,
          {
            word: this.generateRandomWord(),
            definition: `d${Math.random()*1000|0}`
          }
        ]
      }

      this.currentWord = this.dictionary[Math.random()*this.dictionary.length|0].word;
    },
    guess: function(e) {
      const definition = e.target.innerText.split(" ")[0];
      this.dictionary.forEach(d => {
        if(d.word === this.currentWord && d.definition === definition){
          this.points++;
          this.$refs.points.style.background = '#14f396';
          setTimeout(() => {
            this.$refs.points.style.background = 'initial';
          }, 300);
        }
      });

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
