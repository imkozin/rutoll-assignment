<template>
  <div class="container mt-4">
    <div class="col-lg-6">
      <form @submit.prevent="editProduct">
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

        <button ref="editButton" class="btn btn-warning mt-4">
          Edit Product
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toastMixin } from '@/mixins/toastMixin'
import Cookies from 'js-cookie'

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
  async created() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/get-product/${this.$route.params.id}`
      )
      const productData = response.data.product
      this.newProduct = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
      }
    } catch (error) {
      console.error('Error fetching product data:', error)
    }
  },
  methods: {
    async editProduct() {
      try {
        this.$refs.editButton.disabled = true
        
        const authData = JSON.parse(sessionStorage.getItem('authData'))
        const token = authData.token

        try {
          const response = await axios.put(
            `${process.env.VUE_APP_API_URL}/api/edit-product/${this.$route.params.id}`,
            this.newProduct,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          console.log(response)
          Cookies.set('productEdited', 'true')
          this.$router.push(`/product/${this.$route.params.id}`)
        } catch (err) {
          this.errorMessage('danger', err.response.data.error)
        }
      } catch (error) {
        this.errorMessage('danger', error.message)
        console.error('Error updating product:', error)
      } finally {
        this.$refs.editButton.disabled = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
