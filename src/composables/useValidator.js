import { ref } from 'vue'

export function useValidator() {
  const errors = ref({})

  const validateField = (fieldName, value, rules) => {
    errors.value[fieldName] = []

    // Required check
    if (rules.required && !value?.trim()) {
      errors.value[fieldName].push('This field is required')
    }

    // Email check
    if (rules.email && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(value)) {
        errors.value[fieldName].push('Please enter a valid email')
      }
    }
    // Mobile number check
    if (rules.mobile && value) {
      const mobilePattern = /^(?:\+234|0)[789]\d{9}$/
      if (!mobilePattern.test(value)) {
      errors.value[fieldName].push('Please enter a valid mobile number')
      }
    }

    // Minimum length check
    if (rules.minLength && value) {
      if (value.length < rules.minLength) {
        errors.value[fieldName].push(`Minimum ${rules.minLength} characters required`)
      }
    }

    return errors.value[fieldName].length === 0
  }

  const clearErrors = (fieldName) => {
    if (fieldName) {
      errors.value[fieldName] = []
    } else {
      errors.value = {}
    }
  }

  return {
    errors,
    validateField,
    clearErrors,
  }
}
