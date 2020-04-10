<template>
  <div id="app">
    <nav>
      <router-link to="/">Game</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
