<template>
  <div class="container mt-5">
    <h2>{{ product.name }}</h2>
    <p class="mt-3">{{ product.description }}</p>
    <h5>$ {{ product.price }}</h5>
    <h6>Published data: {{ product.created }}</h6>

    <div class="mt-3" v-if="isAuthenticated">
      <button ref="deleteButton" class="btn btn-danger mx-3" @click="deleteProduct">Delete</button>
      <router-link
        class="btn btn-success"
        :to="{ name: 'edit', params: { id: product.id } }"
        >Update</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import { toastMixin } from '@/mixins/toastMixin'
import { authMixin } from '@/mixins/authMixin'

export default {
  data() {
    return {
      product: {},
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
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/get-product/${this.$route.params.id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        this.product = response.data.product
      } catch (error) {
        console.error('Error fetching product:', error)
        return this.$router.push('/404')
      }
    },
    async deleteProduct() {
      try {
        this.$refs.deleteButton.disabled = true

        const authData = JSON.parse(sessionStorage.getItem('authData'))
        const token = authData.token
        
        try {
          const response = await axios.delete(
            `${process.env.VUE_APP_API_URL}/api/delete-product/${this.$route.params.id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          )
          Cookies.set('productDeleted', 'true');
          this.$router.push('/')
        } catch (err) {
          console.log('err', err);
          this.errorMessage('danger', err.response.data.error)
        }
      } catch (err) {
        this.errorMessage('danger', err.message)
        console.error('Error deleting product:', err.message)
      } finally {
        this.$refs.deleteButton.disabled = false
      }
    },
  },
}
</script>

<style scoped></style>
