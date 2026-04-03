// stores/contact.js
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { contactApi } from '@/services/api.service.js'

export const useContactStore = defineStore('contact', () => {
  const loading = ref(false)
  const success = ref(false)
  const error = ref(null)
  const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const errors = reactive({})

  function validate() {
    // Clear existing errors
    Object.keys(errors).forEach(k => delete errors[k])
    
    // Validate name
    if (!form.name.trim()) {
      errors.name = 'Full name is required'
    } else if (form.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Validate message
    if (!form.message.trim()) {
      errors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      errors.message = 'Please provide more detail (minimum 10 characters)'
    }
    
    return Object.keys(errors).length === 0
  }

  function formatDataForAPI() {
    return {
      fullName: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject?.trim() || 'General Inquiry',
      message: form.message.trim()
    }
  }

  async function submit() {
    if (!validate()) return false
    
    loading.value = true
    error.value = null
    
    try {
      const apiData = formatDataForAPI()
      const response = await contactApi.send(apiData)
      
      // Check if submission was successful
      if (response?.data?.success) {
        success.value = true
        return true
      } else {
        throw new Error(response?.data?.message || 'Submission failed')
      }
    } catch (err) {
      console.error('[ContactStore] submit failed:', err)
      error.value = err.response?.data?.message ||
                    err.message ||
                    'Unable to send message. Please email vividkode@gmail.com directly.'
      return false
    } finally {
      loading.value = false
    }
  }

  function reset() {
    success.value = false
    error.value = null
    Object.assign(form, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    Object.keys(errors).forEach(k => delete errors[k])
  }

  return {
    form,
    errors,
    loading,
    success,
    error,
    submit,
    reset
  }
})