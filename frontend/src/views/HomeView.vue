<template>
  <div class="container mt-5">
    <h2 v-if="email" class="text-center mb-2">Welcome! You are logged in as {{ email }}</h2>
    <table class="table table-striped table-hover mt-2">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, indx) in products" :key="product.id">
          <th scope="row">{{ indx + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ truncateDescription(product.description) }}</td>
          <td>$ {{ product.price }}</td>
          <RouterLink
            :to="{ name: 'product', params: { id: product.id } }"
            class="btn btn-secondary"
            >Details</RouterLink
          >
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: [],
      email: '',
    }
  },
  created() {
    const authData = JSON.parse(sessionStorage.getItem('authData'))
    const email = authData.email
    if (email) {
      this.email = email
    }
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/products')
        this.products = response.data.products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    truncateDescription(description) {
      const maxLength = 50;
      if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
      } else {
        return description;
      }
    }
  },
  mounted() {
    document.title = 'Home'
    this.getProducts()
  },
}
</script>

<style lang="scss" scoped></style>
