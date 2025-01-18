export default {
  install(app) {
    app.config.globalProperties.$validateInput = {
      isEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailPattern.test(value)
      },
      isNigerianPhoneNumber(value) {
        const nigerianPhonePattern = /^(?:\+234|0)?(70|80|81|90|91|701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|901|902|903|904|905|906|907|908|909)\d{7}$/
        return nigerianPhonePattern.test(value)
      },
      isNotEmpty(value) {
        return value.trim().length > 0
      },
    }
  },
}
