<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light"> <!-- Fixed Top -->
    <div class="container">
      <router-link to="/" class="navbar-brand"><img src="../assets/logo_1.png"></router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/my-recipes" class="nav-link">My Recipes</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/recipesGPT" class="nav-link">RecipesGPT</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/import" class="nav-link">Import Recipe</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <template v-if="this.$store.state.isAuthenticated">
          <li class="nav-item" id="myaccount">
            <router-link to="/my-account" class="nav-link">My Account</router-link>
          </li>
          <li class="nav-item">
            <a @click='logout' class="nav-link btn-logout">Logout</a>
          </li>
        </template>

        <template v-else>
          <li class="nav-item" id="register">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link btn-login">Login</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<script>
import axios from 'axios'

export default {

  methods: {
    logout() {

      axios.defaults.headers.common["Authorization"] = ""
      localStorage.removeItem("token")
      localStorage.removeItem("Id")

      this.$store.commit('removeToken')
      this.$store.commit('removeId')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.btn-login,
.btn-logout {
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 36px;
  border-radius: 50px;
  transition: 0.5s;
  color: #fff;
  background: var(--color-primary);
  box-shadow: 0 8px 28px rgba(206, 18, 18, 0.2);
}

#register,
#myaccount {
  padding-right: 10px;
}

a.nav-link {

  cursor: pointer;
}


.navbar-brand img {
  height: 55px
}

.nav-link {
  font-weight: bold;
  font-size: 17px;
}
</style>