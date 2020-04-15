<template>
  <div class="container dashboard">
    <header>{{ user }}'s Dashboard</header>
    <section class="stats">
      <DashboardItem title="Accuracy" v-bind:value="stats.accuracy+'%'" />
      <DashboardItem title="Total points" v-bind:value="stats.points.overall" />
      <DashboardItem title="Time spent" v-bind:value="stats.timeSpent" />
      <DashboardItem title="Games played" v-bind:value="stats.gamesPlayed" />
      <DashboardItem title="Recent errors" v-bind:value="stats.recentlyMistakenWords" />
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import DashboardItem from './DashboardItem';
import secondsToHMS from '../utils/secondsToHMS';

export default {
  name: 'Dashboard',
  components: { DashboardItem },
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
        recentlyMistakenWords: []
      }
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(async user => {
      const doc = await firebase.firestore()
        .collection('vocab')
        .doc(user ? user.email : 'Guest')
        .get();
      if(!doc.data()) return;
      const { gamesPlayed, points, secondsSpent, recentlyMistakenWords } = doc.data();

      this.stats = {
        gamesPlayed,
        points,
        accuracy: (points.overall / (gamesPlayed * 10) * 100).toFixed(2),
        timeSpent: secondsToHMS(secondsSpent || 0),
        recentlyMistakenWords: recentlyMistakenWords || []
      };
    });
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