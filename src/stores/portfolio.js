import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { projectApi } from '@/services/api.service.js'

export const usePortfolioStore = defineStore('portfolio', () => {
  const filter = ref('All')
  const filters = ['All', 'Web', 'AI', 'Data', 'Mobile']
  const projects = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const isLoaded = ref(false)

  const mapCategory = category => {
    if (!category) return 'Web'
    const normalized = String(category).trim()
    if (/ai|ml|machine|intelligence/i.test(normalized)) return 'AI'
    if (/data|analytics|warehouse|etl/i.test(normalized)) return 'Data'
    if (/mobile|android|ios/i.test(normalized)) return 'Mobile'
    if (/web|website|frontend|backend|full[- ]?stack|web development/i.test(normalized)) return 'Web'
    return 'Web'
  }

  const toUiProject = item => {
    const firstImage = item.imageUrls?.[0]
    return {
      id: item.id,
      title: item.title,
      client: item.clientName || 'Confidential Client',
      category: mapCategory(item.category),
      tags: item.techStack ? String(item.techStack).split(',').map(t => t.trim()).filter(Boolean) : [],
      imageUrl: firstImage || null,
      accent: '#C9A84C',
      desc: item.projectDescription || 'No description available yet.',
      fullDesc: item.projectDescription || 'No description available yet.',
      results: [
        `Status: ${item.status || 'Completed'}`,
        `Type: ${item.projectType || 'Web Development'}`,
        item.projectLink ? 'Live project available' : 'Private project details'
      ],
      projectLink: item.projectLink,
      status: item.status,
      projectType: item.projectType
    }
  }

  const fetchProjects = async () => {
    if (isLoading.value) return
    if (isLoaded.value && projects.value.length > 0) return
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await projectApi.getAll()
      const data = Array.isArray(response?.data?.data) ? response.data.data : []
      
      if (data.length > 0) {
        projects.value = data.map(toUiProject)
        isLoaded.value = true
      } else {
        projects.value = []
        error.value = 'No projects found.'
      }
    } catch (err) {
      console.error('[PortfolioStore] fetchProjects failed:', err)
      error.value = err.message || 'Failed to load projects. Please try again.'
      projects.value = []
    } finally {
      isLoading.value = false
    }
  }

  const filtered = computed(() => {
    if (filter.value === 'All') return projects.value
    return projects.value.filter(p => p.category === filter.value)
  })
  
  const getById = id => projects.value.find(p => p.id === id)
  
  const retryFetch = () => {
    error.value = null
    return fetchProjects()
  }
  
  return { 
    filter, 
    filters, 
    projects, 
    filtered, 
    getById, 
    fetchProjects,
    isLoading,
    error,
    isLoaded,
    retryFetch
  }
})