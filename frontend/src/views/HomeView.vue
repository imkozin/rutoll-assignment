<template>
  <div class="container mt-5">
    <table class="table table-striped table-hover">
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
        <td>{{ product.description }}</td>
        <td>$ {{ product.price }}</td>
        <RouterLink
          :to="{ name: 'product', params: { id: product.id } }"
          class="btn btn-secondary"
          >Details</RouterLink>
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
      products: []
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
    }
  },
  mounted() {
    document.title = 'Home'
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped></style>
