import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AuthView from '@/views/AuthView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import EditView from '@/views/EditView.vue'

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
      import('../views/ProductDetails.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () =>
      import('../views/ProductDetails.vue'),
  },
  {
    path: '/create',
    name: 'create',
    component: () =>
      import('../views/FormView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () =>
      import('../views/EditView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authData = JSON.parse(sessionStorage.getItem('authData'))
    if (authData) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
