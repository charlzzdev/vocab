<template>
  <div class="container">
    <h1>Login</h1>
    <p class="small-text">
      If you don't have an account yet, it'll be automatically created when you try to login.
    </p>
    <form>
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="john.doe@example.com"/>
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="asterisks"/>
      <button>Login</button>
    </form>
  </div>
</template>

<script>
export default {

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