<template>
  <div class="container mt-5">
    <h2 v-if="email" class="text-center mb-2">
      Welcome! You are logged in as {{ email }}
    </h2>
    <div class="input-group">
      <input
        type="search"
        class="form-control rounded"
        placeholder="Search by product name"
        aria-label="Search"
        aria-describedby="search-addon"
        v-model="searchItem"
      />
    </div>

    <div v-if="searchItem">
      <table class="table table-striped table-bordered table-hover mt-2">
      <thead>
        <tr class="text-center">
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">More</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, indx) in filteredProducts"
          :key="product.id"
          class="text-center"
        >
          <th scope="row">{{ indx + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ truncateDescription(product.description) }}</td>
          <td>$ {{ product.price }}</td>
          <router-link
            :to="{ name: 'product', params: { id: product.id } }"
            class="btn btn-secondary d-flex justify-content-center"
          >
            Details
          </router-link>
        </tr>
      </tbody>
    </table>
    </div>

    <div v-else>
      <table class="table table-striped table-bordered table-hover mt-2">
        <thead>
          <tr class="text-center">
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">More</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, indx) in paginatedProducts"
            :key="product.id"
            class="text-center"
          >
            <th scope="row">{{ (currentPage - 1) * pageSize + indx + 1 }}</th>
            <td>{{ product.name }}</td>
            <td>{{ truncateDescription(product.description) }}</td>
            <td>$ {{ product.price }}</td>
            <router-link
              :to="{ name: 'product', params: { id: product.id } }"
              class="btn btn-secondary d-flex justify-content-center"
            >
              Details
            </router-link>
          </tr>
        </tbody>
      </table>
  
      <div>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">&laquo;</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page">
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage">&raquo;</button>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { toastMixin } from '@/mixins/toastMixin'

export default {
  data() {
    return {
      products: [],
      email: '',
      searchItem: '',
      currentPage: 1,
      pageSize: 10,
    }
  },
  mixins: [toastMixin],
  created() {
    const authData = JSON.parse(sessionStorage.getItem('authData'))
    const email = authData.email
    if (email) {
      this.email = email
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchItem) {
        return this.products
      } else {
        const search = this.searchItem.toLowerCase()
        return this.products.filter((item) =>
          item.name.toLowerCase().includes(search)
        )
      }
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredProducts.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize)
    },
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_API_URL + '/api/products',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        this.products = response.data.products
      } catch (error) {
        this.errorMessage('danger', error.message)
        console.error('Error fetching products:', error)
      }
    },
    truncateDescription(description) {
      const maxLength = 50
      if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...'
      } else {
        return description
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPage(page) {
      this.currentPage = page
    },
  },
  mounted() {
    document.title = 'Home'
    this.getProducts()
  },
}
</script>

<style lang="scss" scoped></style>
