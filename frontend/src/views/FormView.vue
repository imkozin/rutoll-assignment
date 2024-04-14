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

        <input type="number" class="form-control" v-model="newProduct.price"/>

        <button class="btn btn-success mt-4">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toastMixin} from '@/mixins/toastMixin'

export default {
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: 0
      }
    }
  },
  mixins: [toastMixin],
  mounted() {
    document.title = 'Create New Product'
  },
  methods: {
    async addProduct() {
      try {
            const response = await axios.post(process.env.VUE_APP_API_URL + '/api/add-product', this.newProduct, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.$router.push('/')
        } catch (error) {
            const { data } = error.response;
            this.errorMessage('danger', data.error)
            console.error('Error creating product:', error);
        }
    },
  },
}
</script>

<style lang="scss" scoped></style>
