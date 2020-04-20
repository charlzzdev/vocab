<template>
  <div class="container">
    <div class="round" v-if="game.round">Round {{ game.round }}/10</div>
    <h1>{{ game.currentWord }}</h1>
    <p id="pointsRef" class="points">
      {{ game.points.overall }}/10 points
    </p>
    <div v-if="!game.gameStarted">
      <button v-on:click="startGame" v-bind:disabled="game.savingToFirebase" id="btn- ">
        Start game as {{ user.data.email }}
      </button>
    </div>
    <div v-else>
      <div v-if="game.choices.length === game.numberOfChoices && !game.info.show">
        <button 
          class="full-width-btn"
          v-for="({ definition, partOfSpeech }, index) in game.choices"
          v-bind:key="definition"
          v-bind:id="'btn-'+(index+1)"
          v-on:click="() => guess(definition)"
        >
          {{ definition }} ({{ partOfSpeech }})
          <span class="key-indicator">{{ index+1 }}</span>
        </button>
      </div>
      <Info
        v-else-if="game.info.show"
        v-bind:title="game.info.title"
        v-bind:text="game.info.text"
        v-bind:actionTitle="game.info.actionTitle"
        v-bind:actionFunction="game.info.actionFunction"
      />
      <div v-else>
        loading next word...
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Info from './Info';
import generateRandomWord from '../utils/generateRandomWord';

export default {
  name: 'Game',
  components: { Info },
  computed: mapState({
    user: state => state.user,
    game: state => state.game
  }),
  methods: {
    ...mapActions([
      'setGameReady',
      'startNextRound',
      'guess'
    ]),
    startGame: function() {
      this.setGameReady();
      this.startNextRound();
    },
    keyUpListener: e => document.getElementById(`btn-${e.key}`)?.click(),
    generateRandomWord
  },
  created: function () {
    document.addEventListener('keyup', this.keyUpListener);
  },
  beforeDestroy: function() {
    document.removeEventListener('keyup', this.keyUpListener);
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
