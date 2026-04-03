import { defineStore } from 'pinia'
import { ref } from 'vue'
import { visionMissionApi } from '@/services/api.service.js'

export const useAboutStore = defineStore('about', () => {
  // State
  const missionData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const isLoaded = ref(false)

  // Default data (fallback)
  const defaultMission = {
    mission: 'To deliver intelligent digital solutions that empower businesses to operate faster and more efficiently — bridging the gap between complex technology and real business value.',
    vision: 'To be the most trusted technology partner for growth-stage companies in Africa and beyond, known for engineering excellence and long-term impact.',
    services: 'Web Development, AI/ML, Data Engineering, Custom Software'
  }

  // Getters
  const mission = () => missionData.value?.mission || defaultMission.mission
  const vision = () => missionData.value?.vission || defaultMission.vision
  const services = () => missionData.value?.services || defaultMission.services

  // Actions
  async function fetchVisionMission() {
    // Don't fetch if already loading or already loaded
    if (isLoading.value) return
    if (isLoaded.value && missionData.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await visionMissionApi.getAll()
      const data = Array.isArray(response?.data?.data) ? response.data.data : []
      const first = data[0]

      if (first) {
        missionData.value = {
          mission: first.mission || defaultMission.mission,
          vission: first.vission || defaultMission.vision,
          services: first.services || defaultMission.services
        }
      } else {
        // Use default data if API returns empty
        missionData.value = defaultMission
      }
      
      isLoaded.value = true
    } catch (err) {
      console.error('[AboutStore] fetchVisionMission failed:', err)
      error.value = err.message || 'Unable to load mission and vision. Please try again later.'
      // Fallback to default data
      missionData.value = defaultMission
    } finally {
      isLoading.value = false
    }
  }

  function reset() {
    missionData.value = null
    isLoading.value = false
    error.value = null
    isLoaded.value = false
  }

  return {
    // State
    missionData,
    isLoading,
    error,
    isLoaded,
    
    // Getters
    mission,
    vision,
    services,
    
    // Actions
    fetchVisionMission,
    reset
  }
})