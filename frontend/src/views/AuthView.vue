<template>
  <div class="container mt-5">
    <form
      @submit.prevent="submitReg"
      class="custom-form shadow bg-white rounded"
    >
      <div class="text-center">
        <h1>Register</h1>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="form.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="form.password"
        />
      </div>
      <div class="form-group form-check">
        <small id="emailHelp" class="form-text text-muted"
          >Already a member?
          <router-link to="/login" class="text-primary"
            >Sign in here</router-link
          ></small
        >
      </div>
      <div class="text-center">
        <button ref="submitBtn" type="submit" class="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { authMixin } from '@/mixins/authMixin'
import { toastMixin } from '@/mixins/toastMixin'

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  mixins: [authMixin, toastMixin],
  mounted() {
    document.title = 'Sign Up'
  },
  methods: {
    async submitReg() {
      try {
        this.$refs.submitBtn.disabled = true
        const response = await axios.post(
          process.env.VUE_APP_API_URL + '/api/register',
          this.form,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        this.$router.push('/login')
      } catch (error) {
        this.errorMessage('danger', error.response.data.error)
        // console.error('Error creating user:', error);
      } finally {
        this.$refs.submitBtn.disabled = false
      }
    },
  },
}
</script>

<style scoped>
.custom-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  /* border: 1px solid #ccc; */
  /* border-radius: 5px; */
  /* background-color: #f9f9f9; */
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.text-success {
  color: #28a745;
}
</style>
