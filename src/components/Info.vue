<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <button
      id="btn- "
      v-on:click="actionFunction"
    >{{ actionTitle }} <span class="key-indicator">Space</span></button>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    title: String,
    text: String,
    actionTitle: String,
    actionFunction: Function
  }
}
</script>

<style scoped>
h2{
  margin-bottom: 0.5rem;
}
p{
  margin-top: 0.5rem;
  line-height: 1.7;
}
.key-indicator{
  position: initial;
  border-radius: 6px;
  margin-left: 0.25rem;
}
</style>