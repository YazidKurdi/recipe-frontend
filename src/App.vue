<template>
  <div class="app">
    <NavBar />
    <div class="content">
      <router-view />
    </div>
    <FooterF v-if="showFooter" />
  </div>

  <div class="is-loading-bar has-text-centered" v-bind:class="{ 'is-loading': $store.state.isLoading }">
    <div class="lds-dual-ring"></div>
  </div>

  <div class="loader-wrapper" v-if="this.$store.state.isLoading">
    <fulfilling-square-spinner :animation-duration="4000" :size="50" color="#a76213" />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterF from './components/FooterF.vue';
import { FulfillingSquareSpinner } from 'epic-spinners'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NavBar,
    FulfillingSquareSpinner,
    FooterF
  },
  computed: {
    showFooter() {
      // get the current route object from the $route property
      const { path } = this.$route
      // return true if the current route is not the login or signup page
      return !['/login', '/register'].includes(path)
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Space+Mono&display=swap');

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px 0px 0px 20px;
}

#app {
  font-family: 'Montserrat';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* Colors */
:root {
  --color-default: #212529;
  --color-primary: #a76213;
  --color-secondary: #37373f;
}
</style>
