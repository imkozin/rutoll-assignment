<template>
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container">
    <RouterLink class="navbar-brand text-style" to="/">ProductApp</RouterLink>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item mx-2">
          <router-link class="btn btn-primary" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <RouterLink class="btn btn-success" to="/create">Create</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.text-style {
    font-size: 2rem;
    font-weight: bold;
    font-family: 'fantasy';
    color:cadetblue;
}
</style>