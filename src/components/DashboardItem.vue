<template>
  <article class="item">
    <h2 class="stat-title">{{ title }}</h2>
    <p class="stat-value" v-if="typeof value !== 'object'">{{ value }}</p>
    <p class="stat-value" v-else>
      <span class="word" v-for="(word, i) in value" v-bind:key="i">
        {{ word }}
      </span>
      <span v-if="!value.length">
        You've made no mistakes yet or have already corrected them.
      </span>
    </p>
  </article>
</template>

<script>
export default {
  name: 'DashboardItem',
  props: {
    title: String,
    value: [String, Number, Array]
  }
}
</script>

<style>

</style>