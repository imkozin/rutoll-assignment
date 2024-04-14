export const authMixin = {
  computed: {
    isAuthenticated() {
      const authData = JSON.parse(sessionStorage.getItem('token'))
      return authData && authData.token !== ''
    },
  },
}
