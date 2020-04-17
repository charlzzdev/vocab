<template>
  <div id="app">
    <nav>
      <router-link to="/">Game</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/login" v-if="user.data.email === 'Guest'">Login</router-link>
      <button class="small-btn" v-else v-on:click="logout">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import secondsToHMS from './utils/secondsToHMS';

export default {
  name: 'App',
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    logout: () => firebase.auth().signOut()
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      const email = user?.email || 'Guest';

      firebase.firestore()
        .collection('vocab')
        .doc(email)
        .onSnapshot(doc => {
          const data = doc.data() || {
            email,
            gamesPlayed: 0,
            points: {
              byWord: {},
              overall: 0
            },
            secondsSpent: 0,
            accuracy: 0.00,
            timeSpent: '00:00:00',
            recentlyMistakenWords: []
          };
          const accuracy = data.points.overall / (data.gamesPlayed * 10) * 100;

          this.$store.commit('setState', {
            email,
            ...data,
            accuracy: (accuracy || 0).toFixed(2),
            timeSpent: secondsToHMS(data.secondsSpent || 0),
            recentlyMistakenWords: data.recentlyMistakenWords || []
          });
        });
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
nav{
  max-width: calc(500px + 2rem);
  margin: 2rem auto;
  text-align: right;
}
nav a{
  margin-left: 1.5rem;
  padding-bottom: 0.15rem;
  color: #2c3e50;
  font-weight: bold;
  text-decoration: none;
}
.router-link-exact-active{
  border-bottom: 2px solid #44ca7f;
}
button{
  background: #44ca7f;
  max-width: 300px;
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1rem;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
button:hover{
  background: #22e277;
}
button:disabled{
  background: #e0e0e0;
  color: #444;
}
.full-width-btn{
  width: 100%;
  margin-top: 1rem;
  position: relative;
}
.small-btn{
  padding: 0;
  margin: 0 0 0 1.5rem;
  background: none !important;
  font-weight: bold;
  color: #2c3e50;
}
.key-indicator{
  background: #279859;
  padding: 0.25rem 0.5rem;
  position: absolute;
  right: 0;
  bottom: 0;
  border-bottom-right-radius: 6px;
  border-top-left-radius: 6px;
  font-size: 0.8rem;
}
</style>
