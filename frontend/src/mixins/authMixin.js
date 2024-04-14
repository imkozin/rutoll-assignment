export const authMixin = {
  data() {
    return {
      isLoggedIn: false,
    }
  },
  computed: {
    isAuthenticated() {
      const authData = JSON.parse(sessionStorage.getItem('authData'))
      return authData && authData.token !== ''
    },
  },
}
