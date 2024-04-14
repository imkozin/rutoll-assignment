<template>
    <div class="container mt-5">
        <h2>{{ product.name }}</h2>
        <p class="mt-3">{{ product.description }}</p>
        <h5>$ {{ product.price }}</h5>
        <h6>Published data: {{ product.created }}</h6>

        <button class="btn btn-danger mx-3 mt-3" @click="deleteUser">Delete</button>
    </div>
</template>

<script>
import axios from 'axios'
import {toastMixin} from '@/mixins/toastMixin'

export default {
  data() {
    return {
      product: {}
    }
  },
  mixins: [toastMixin],
  mounted() {
    document.title = 'Product Details'
    this.getProduct()
  },
  methods: {
    async getProduct() {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-product/${this.$route.params.id}`)
        console.log(response);
        this.product = response.data.product
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    },
    async deleteUser() {
        try {
            const res = await axios.delete(`http://localhost:8000/api/delete-product/${this.$route.params.id}`);
            this.$router.push({
              name: 'home'
            })
            this.successMessage('success', res.data.message)
            console.log('User deleted successfully');
        } catch (err) {
            console.error('Error deleting user:', err.message);
        }
    },
  }
}
</script>



<style scoped>

</style>