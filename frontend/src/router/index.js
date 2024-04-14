import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AuthView from '@/views/AuthView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ProductDetails.vue'),
  },
  {
    path: '/create',
    name: 'create',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/FormView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
