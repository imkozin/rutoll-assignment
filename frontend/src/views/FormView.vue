<template>
  <div class="container mt-4">
    <div class="col-lg-6">
      <form @submit.prevent="addProduct">
        <input
          type="text"
          class="form-control"
          placeholder="Enter a product name"
          v-model="newProduct.name"
        /><br />

        <textarea
          rows="5"
          class="form-control"
          placeholder="Enter product description"
          v-model="newProduct.description"
        ></textarea
        ><br />

        <input type="number" class="form-control" v-model="newProduct.price" />

        <button class="btn btn-success mt-4">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toastMixin } from '@/mixins/toastMixin'

export default {
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: 0,
      },
    }
  },
  mixins: [toastMixin],
  mounted() {
    document.title = 'Create New Product'
  },
  methods: {
    async addProduct() {
      try {
        const authData = JSON.parse(sessionStorage.getItem('authData'))
        const token = authData.token

        try {
          const response = await axios.post(
            process.env.VUE_APP_API_URL + '/api/add-product',
            this.newProduct,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          )
          this.$router.push('/')
        } catch (err) {
          this.errorMessage('danger', err.response.data.error)
        }
      } catch (error) {
        this.errorMessage('danger', error.message)
        console.error('Error creating product:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
