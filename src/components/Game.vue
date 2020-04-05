<template>
  <div>
    <h1>{{ currentWord }}</h1>
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
      dictionary: []
    };
  },
  methods: {
    generateRandomWord: function() {
      const { words } = wordList;
      const randomWord = words[Math.random() * words.length | 0]; 
      return randomWord;
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
          console.log('correct');
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

</style>
