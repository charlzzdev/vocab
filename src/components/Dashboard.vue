<template>
  <div class="container dashboard">
    <header>{{ user }}'s Dashboard</header>
    <section class="stats">
      <article class="item">
        <h2 class="stat-title">Accuracy</h2>
        <p class="stat-value">{{ stats.accuracy }}%</p>
      </article>
      <article class="item">
        <h2 class="stat-title">Total points</h2>
        <p class="stat-value">{{ stats.points.overall }}</p>
      </article>
      <article class="item">
        <h2 class="stat-title">Time spent</h2>
        <p class="stat-value">{{ stats.timeSpent }}</p>
      </article>
      <article class="item">
        <h2 class="stat-title">Games played</h2>
        <p class="stat-value">{{ stats.gamesPlayed }}</p>
      </article>
      <article class="item">
        <h2 class="stat-title">Recent errors</h2>
        <p class="stat-value">
          <span class="word" v-for="(word, i) in stats.recentlyMistakenWords" v-bind:key="i">
            {{ word }}
          </span>
          <span v-if="!stats.recentlyMistakenWords">You've made no mistakes recently.</span>
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

import secondsToHMS from '../utils/secondsToHMS';

export default {
  name: 'Dashboard',
  props: {
    user: String
  },
  data: function() {
    return {
      stats: {
        gamesPlayed: 0,
        points: { overall: 0 },
        accuracy: 0,
        timeSpent: '00:00:00',
        recentlyMistakenWords: null
      }
    }
  },
  created: async function() {
    const doc = await firebase.firestore()
      .collection('vocab')
      .doc(this.user)
      .get();
    if(!doc.data()) return;
    const { gamesPlayed, points, secondsSpent, recentlyMistakenWords } = doc.data();

    this.stats = {
      gamesPlayed,
      points,
      accuracy: (points.overall / (gamesPlayed * 10) * 100).toFixed(2),
      timeSpent: secondsToHMS(secondsSpent || 0),
      recentlyMistakenWords
    };
  }
}
</script>

<style lang="scss">
.dashboard{
  padding: 0;
  max-width: calc(500px + 2rem);
  header {
    padding: 2rem;
    background: #44ca7f;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    font-weight: bold;
    font-size: 1.25rem;
  }
  .stats{
    display: grid;
    padding: 2rem;
    text-align: left;  
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    .item{
      text-align: center;
      .stat-title{
        font-size: 0.75rem;
        text-transform: uppercase;
        color: #5f6c79;
        font-weight: normal;
      }
      .stat-value{
        font-size: 1.5rem;
        font-weight: bold;
      }
      .word{
        display: inline-block;
        padding: 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        background: #e0e0e0;
        word-break: break-all;
        border-radius: 6px;
        font-weight: normal;
        font-size: 1rem;
      }
      &:last-child{
        grid-column: 1/3;
      }
      @media(max-width: 300px){
        grid-column: 1/3;
      }
    }
  }
}

</style>