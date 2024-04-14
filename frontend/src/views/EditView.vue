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

        <input
          type="number"
          class="form-control"
          v-model="newProduct.price"
        />

        <button class="btn btn-warning mt-4">Edit Product</button>
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
        price: 0,
      },
    }
  },
  mixins: [toastMixin],
  async created() {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-product/${this.$route.params.id}`);
      const productData = response.data.product;
      this.newProduct = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
      };
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  },
  methods: {
    async editProduct() {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/edit-product/${this.$route.params.id}`,
          this.newProduct
        )
        console.log(response);
        //   this.newProduct = {}
        this.$router.push(`/product/${this.$route.params.id}`)
      } catch (error) {
        console.log('e', error);
        const { data } = error.response
        this.errorMessage('danger', data.error)
        console.error('Error updating product:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
