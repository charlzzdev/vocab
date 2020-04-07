<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <button v-on:click="generateDictionary">Continue</button>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    title: String,
    text: String,
    generateDictionary: Function
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
</style>