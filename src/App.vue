<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/Game';

export default {
  name: 'App',
  components: {
    Game
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
