<template>
  <div class="container">
    <h1>Login</h1>
    <p class="small-text">
      If you don't have an account yet, it'll be automatically created when you try to login.
    </p>
    <form v-on:submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" placeholder="john.doe@example.com"/>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" placeholder="asterisks"/>
      <button>Login</button>
      <p v-bind:style="`color: ${info.color};`">{{ info.text }}</p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: '',
      info: { color: '', text: '' }
    }
  },
  methods: {
    login: function() {
      this.info = { color: 'green', text: 'Logging in...' };

      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push('dashboard'))
        .catch(err => {
          if(err.code === 'auth/user-not-found'){
            this.info = { color: 'green', text: 'Creating account...' };

            firebase.auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(() => this.$router.push('dashboard'))
              .catch(err => this.info = { color: 'red', text: err.message });
          } else this.info = { color: 'red', text: err.message };
        });
    }
  }
}
</script>

<style>
form{
  max-width: 250px;
  margin: 0 auto;
}
form *{
  display: block;
}
form label{
  text-align: left;
  margin: 1rem 0 0.25rem 0;
}
form input{
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
}
form button{
  width: 100%;
}
.small-text{
  max-width: 250px;
  margin: 1rem auto 2rem auto;
  font-size: 12px;
}
</style>