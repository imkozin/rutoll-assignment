<template>
    <div class="container mt-5">
        <h2>{{ product.name }}</h2>
        <p class="mt-3">{{ product.description }}</p>
        <h5>$ {{ product.price }}</h5>
        <h6>Published data: {{ product.created }}</h6>

        <div class="mt-3" v-if="isAuthenticated">
          <button class="btn btn-danger mx-3" @click="deleteProduct">Delete</button>
          <router-link class="btn btn-success" :to="{name: 'edit', params: {id: product.id}}">Update</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {toastMixin} from '@/mixins/toastMixin'
import { authMixin } from '@/mixins/authMixin'

export default {
  data() {
    return {
      product: {}
    }
  },
  mixins: [toastMixin, authMixin],
  mounted() {
    document.title = 'Product Details'
    this.getProduct()
  },
  methods: {
    async getProduct() {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-product/${this.$route.params.id}`)
        this.product = response.data.product
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    },
    async deleteProduct() {
        try {
            const res = await axios.delete(`http://localhost:8000/api/delete-product/${this.$route.params.id}`);
            this.successMessage('success', res.data.message)
            this.$router.push({
              name: 'home'
            })
            console.log('Product deleted successfully');
        } catch (err) {
            console.error('Error deleting product:', err.message);
        }
    },
  }
}
</script>



<style scoped>

</style>