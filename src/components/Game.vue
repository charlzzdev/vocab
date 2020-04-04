<template>
  <div>
    <h1>{{randomWord}}</h1>
    <button v-on:click="generateRandomWord">Generate random word</button>
  </div>
</template>

<script>
import wordList from '../assets/wordList';

export default {
  name: 'Game',
  data: () => {
    return {
      randomWord: 'word'
    };
  },
  methods: {
    generateRandomWord: function() {
      const { words } = wordList;
      const randomWord = words[Math.random() * words.length | 0]; 
      this.randomWord = randomWord;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
