<template>
  <div class="container">
    <div class="round" v-if="round">Round {{ round }}/10</div>
    <h1>{{ currentWord }}</h1>
    <p ref="points" class="points">
      {{ points.overall }}/10 points
    </p>
    <div v-if="!gameStarted">
      <button v-on:click="startGame" id="btn- ">
        Start game as {{ user }}
      </button>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
import Info from './Info';
import generateRandomWord from '../utils/generateRandomWord';
import generateDictionary from '../utils/generateDictionary';
import guess from '../utils/guess';

export default {
  name: 'Game',
  components: { Info },
  props: { user: String },
  data: () => {
    return {
      currentWord: '',
      dictionary: {},
      choices: [],
      numberOfChoices: 3,
      points: {
        overall: 0,
        byWord: {}
      },
      gameStarted: false,
      round: 0,
      secondsSpent: 0,
      secondsSpentCounter: null,
      info: { show: false, title: '', text: '' }
    };
  },
  methods: {
    startGame: function() {
      this.secondsSpentCounter = setInterval(() => this.secondsSpent++, 1000);
      this.gameStarted = true;
      this.generateDictionary();
    },
    generateRandomWord,
    generateDictionary,
    guess
  },
  created: function () {
    document.addEventListener('keyup', e => {
      const button = document.getElementById(`btn-${e.key}`);
      button?.click();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container{
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
.round{
  text-align: right;
}
</style>
