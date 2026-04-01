import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  const loading = ref(false)
  const success = ref(false)
  const error   = ref(null)
  const form    = reactive({ name:'', email:'', company:'', service:'', date:'', time:'', message:'' })
  const errors  = reactive({})

  function validate() {
    Object.keys(errors).forEach(k => delete errors[k])
    if (!form.name.trim())   errors.name    = 'Full name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address'
    if (!form.service)       errors.service = 'Please select a service'
    if (form.message.trim().length < 20) errors.message = 'Please describe your project (min 20 characters)'
    return !Object.keys(errors).length
  }

  async function submit() {
    if (!validate()) return false
    loading.value = true; error.value = null
    try {
      await new Promise(r => setTimeout(r, 1500)) // swap for: await bookingApi.create({...form})
      success.value = true; return true
    } catch(e) {
      error.value = 'Submission failed. Please email hello@vividkode.dev directly.'; return false
    } finally { loading.value = false }
  }

  function reset() {
    success.value = false; error.value = null
    Object.assign(form, { name:'', email:'', company:'', service:'', date:'', time:'', message:'' })
    Object.keys(errors).forEach(k => delete errors[k])
  }

  return { form, errors, loading, success, error, submit, reset }
})
