<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #e3f2fd"
  >
    <router-link to="/" class="navbar-brand" >ProductApp</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor03"
      aria-controls="navbarColor03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor03">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create</router-link>
        </li>
      </ul>
      <div>
        <router-link
          class="btn btn-outline-primary my-2 mx-2 my-sm-0"
          type="submit"
          to="/login"
          v-show="!isAuthenticated"
        >
          Sign In
        </router-link>
        <router-link
          class="btn btn-outline-primary my-2 my-sm-0"
          type="submit"
          to="/auth"
          v-show="!isAuthenticated"
        >
          Sign Up
        </router-link>
        <button
          class="btn btn-outline-primary my-2 my-sm-0"
          type="submit"
          @click="logout"
          v-if="isAuthenticated"
        >
          Log Out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { authMixin } from '@/mixins/authMixin'

export default {
  name: 'NavBar',
  mixins: [authMixin],
  methods: {
    logout() {
      sessionStorage.removeItem('authData')
      this.$router.push('/login')
      location.reload()
    },
  },
}
</script>

<style scoped>
.text-style {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'fantasy';
  color: cadetblue;
}
</style>
