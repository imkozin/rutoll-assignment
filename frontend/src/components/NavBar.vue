<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <router-link class="navbar-brand text-style" to="/">ProductApp</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-2">
            <router-link class="btn btn-primary" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item mx-2" v-show="isAuthenticated">
            <router-link class="btn btn-success" to="/create">Create</router-link>
          </li>
          <li class="nav-item mx-2" v-show="isAuthenticated">
            <router-link class="link" @click="logout">Log Out</router-link>
          </li>
          <li class="nav-item mx-2" v-show="!isAuthenticated">
            <router-link class="btn btn-primary" to="/login">Sign In</router-link>
          </li>
          <li class="nav-item mx-2" v-show="!isAuthenticated">
            <router-link class="btn btn-primary" to="/auth">Sign Up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { authMixin } from '@/mixins/authMixin';


export default {
        name: "NavBar",
        mixins: [authMixin],
        methods: {
          logout() {
            sessionStorage.removeItem('token');
            // location.reload()
            this.$router.push('/login')
            console.log('params', this.$route.path);
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
