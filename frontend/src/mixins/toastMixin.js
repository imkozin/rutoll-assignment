export const toastMixin = {
  methods: {
    errorMessage(variant = null, error) {
      this.$bvToast.toast(error, {
        title: `Error`,
        variant: variant,
        autoHideDelay: 3000,
        solid: true,
      })
    },
    authError(variant = null, error) {
      this.$bvToast.toast(error, {
        title: `Authentication Error`,
        variant: variant,
        autoHideDelay: 3000,
        solid: true,
      })
    },
    successMessage(variant = null, message) {
      this.$bvToast.toast(message, {
        title: `Success`,
        variant: variant,
        autoHideDelay: 3000,
        solid: true,
      })
    }
  },
}