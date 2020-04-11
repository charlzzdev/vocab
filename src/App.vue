<template>
  <div id="app">
    <nav>
      <router-link to="/">Game</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/login" v-if="user === 'Guest'">Login</router-link>
      <button class="small-btn" v-else v-on:click="logout">Logout</button>
    </nav>
    <router-view v-bind:user="user"></router-view>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'App',
  data: function() {
    return { user: 'Guest' }
  },
  methods: {
    logout: function() {
      this.user = 'Guest';
      firebase.auth().signOut();
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) this.user = user.email;
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
