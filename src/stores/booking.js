import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { bookingApi } from '@/services/api.service.js'

export const useBookingStore = defineStore('booking', () => {
  const loading = ref(false)
  const success = ref(false)
  const error   = ref(null)
  const form    = reactive({ 
    name: '', 
    email: '', 
    company: '', 
    service: '', 
    date: '', 
    time: '', 
    message: '' 
  })
  const errors  = reactive({})

  function validate() {
    // Clear existing errors
    Object.keys(errors).forEach(k => delete errors[k])
    
    // Validate name
    if (!form.name.trim()) errors.name = 'Full name is required'
    else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) errors.email = 'Email address is required'
    else if (!emailRegex.test(form.email)) errors.email = 'Please enter a valid email address'
    
    // Validate service
    if (!form.service) errors.service = 'Please select a service'
    
    // Validate message
    if (!form.message.trim()) errors.message = 'Please describe your project'
    else if (form.message.trim().length < 20) errors.message = 'Please provide more detail (minimum 20 characters)'
    
    return Object.keys(errors).length === 0
  }

  function formatDataForAPI() {
    // Format date if present
    let formattedDate = form.date
    if (formattedDate) {
      const dateObj = new Date(formattedDate)
      formattedDate = dateObj.toISOString().split('T')[0]
    }
    
    return {
      fullName: form.name.trim(),
      email: form.email.trim(),
      companyName: form.company?.trim() || '',
      service: form.service,
      date: formattedDate || '',
      time: form.time || '',
      message: form.message.trim()
    }
  }

  async function submit() {
    if (!validate()) return false
    
    loading.value = true
    error.value = null
    
    try {
      const apiData = formatDataForAPI()
      const response = await bookingApi.create(apiData)
      
      // Check if submission was successful
      if (response?.data?.success) {
        success.value = true
        return true
      } else {
        throw new Error(response?.data?.message || 'Submission failed')
      }
    } catch (err) {
      console.error('[BookingStore] submit failed:', err)
      error.value = err.response?.data?.message || 
                    err.message || 
                    'Unable to submit consultation request. Please email hello@vividkode.dev directly.'
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
      company: '', 
      service: '', 
      date: '', 
      time: '', 
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