export default {
  install(app) {
    app.config.globalProperties.$validateInput = {
      isEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailPattern.test(value)
      },
      isNumber(value) {
        return !isNaN(value)
      },
      isPhoneNumber(value) {
        const phonePattern = /^\+?[1-9]\d{1,14}$/
        return phonePattern.test(value)
      },
      isNotEmpty(value) {
        return value.trim().length > 0
      },
    }
  },
}
