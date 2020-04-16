<template>
  <div class="container dashboard">
    <header>{{ user.data.email }}'s Dashboard</header>
    <section class="stats">
      <DashboardItem title="Accuracy" v-bind:value="user.data.accuracy+'%'" />
      <DashboardItem title="Total points" v-bind:value="user.data.points.overall" />
      <DashboardItem title="Time spent" v-bind:value="user.data.timeSpent" />
      <DashboardItem title="Games played" v-bind:value="user.data.gamesPlayed" />
      <DashboardItem title="Recent errors" v-bind:value="user.data.recentlyMistakenWords" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import DashboardItem from './DashboardItem';

export default {
  name: 'Dashboard',
  components: { DashboardItem },
  computed: mapState({
    user: state => state.user
  })
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