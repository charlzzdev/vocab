import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Game from './components/Game'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '*', redirect: '/' },
    { path: '/', component: Game },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
