<template>
  <div class="container mt-5">
    <form @submit.prevent="submitLogin" class="custom-form">
      <div class="text-center">
        <h1>Login</h1>
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
          >Not a member?
          <router-link to="/auth" class="text-primary"
            >Sign up here</router-link
          ></small
        >
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { authMixin } from '@/mixins/authMixin'
import { toastMixin } from '@/mixins/toastMixin'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  mounted() {
    document.title = 'Sign In'
    console.log(process.env.NODE_ENV)
  },
  mixins: [authMixin, toastMixin],
  methods: {
    async submitLogin() {
      try {
        const response = await axios.post(
          process.env.VUE_APP_API_URL + '/api/login',
          this.form,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        try {
          if (response.status === 200) {
            const { access_token, email } = response.data
            sessionStorage.setItem(
              'authData',
              JSON.stringify({ token: access_token, email })
            )
            this.$router.push('/')
            location.reload()
          } else {
            this.authError('danger', response.data.error)
          }
        } catch (err) {
          console.log('err1', err)
          this.authError('danger', err)
        }
      } catch (err) {
        this.authError('danger', err.response.data.error)
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
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
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
