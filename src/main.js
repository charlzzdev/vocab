import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

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

firebase.initializeApp({
  apiKey: "AIzaSyB6tmZ_w1d2vyK4hIGqBEUfMTlNbLjFjFA",
  authDomain: "entertainment-rating-app.firebaseapp.com",
  databaseURL: "https://entertainment-rating-app.firebaseio.com",
  projectId: "entertainment-rating-app",
  storageBucket: "entertainment-rating-app.appspot.com",
  messagingSenderId: "293386828518",
  appId: "1:293386828518:web:01a359ec938c8104181927"
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
