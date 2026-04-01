import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { projectApi } from '@/services/api.service.js'

const PROJECTS = [
  { id:'nexaretail', title:'NexaRetail Analytics Platform', client:'NexaRetail Ltd', category:'Data', year:'2024', tags:['Python','Apache Kafka','PostgreSQL','Tableau','FastAPI','Vue 3'], thumb:'#0d2d4a', accent:'#00C49A', desc:'Real-time sales analytics and inventory forecasting platform serving 200+ retail locations across East Africa.', fullDesc:'A comprehensive analytics platform ingesting POS data in real-time via Kafka, running demand forecasting models, and surfacing actionable insights through an interactive Vue 3 dashboard. Used daily by store managers and regional directors across East Africa.', results:['32% reduction in stockouts','18% better inventory turnover','200+ locations served live'] },
  { id:'mediscan',   title:'MediScan AI Diagnostic Tool',   client:'HealthBridge',     category:'AI',   year:'2024', tags:['PyTorch','ResNet-50','FastAPI','React','AWS SageMaker'], thumb:'#1a0d2e', accent:'#C9A84C', desc:'Computer vision system detecting diabetic retinopathy from fundus photographs with 94% clinical accuracy.', fullDesc:'A deep learning diagnostic solution trained on 45,000 annotated fundus images. Achieves 94% sensitivity and 91% specificity, fully integrated into the clinical workflow — enabling ophthalmologists to screen five times more patients per day.', results:['94% diagnostic sensitivity','5× patient screening throughput','45,000 training images used'] },
  { id:'zawadi',     title:'Zawadi E-Commerce Platform',     client:'StyleKe',          category:'Web',  year:'2023', tags:['Vue 3','Node.js','PostgreSQL','Redis','M-Pesa API','AWS'], thumb:'#1B3A5C', accent:'#C9A84C', desc:'Full-stack gifting marketplace with AI-powered recommendations, real-time inventory, and M-Pesa integration.', fullDesc:'A bespoke marketplace featuring a collaborative filtering engine (+28% AOV), M-Pesa STK push payments, a vendor management portal, and a full analytics dashboard. Architected to serve 50,000 concurrent users at peak season.', results:['40% sales growth in Q1 post-launch','28% higher average order value','50,000 concurrent users at peak'] },
  { id:'finsight',   title:'FinSight Data Warehouse',        client:'MicroFinance Corp', category:'Data', year:'2024', tags:['dbt','Apache Airflow','BigQuery','Python','Looker','Terraform'], thumb:'#0a3d2a', accent:'#00C49A', desc:'Cloud data warehouse consolidating 14 data sources for a microfinance institution with automated regulatory reporting.', fullDesc:'End-to-end data engineering for a microfinance institution managing 180,000 borrower accounts. Built with dbt, Airflow, and BigQuery to consolidate 14 disparate sources. Automated 47 regulatory reports that previously required 3 days of manual work per month.', results:['47 reports fully automated','3 days manual work eliminated monthly','14 data sources unified'] },
  { id:'linguabot',  title:'LinguaBot NLP Pipeline',          client:'Gov Digital Services', category:'AI', year:'2024', tags:['HuggingFace','LangChain','FastAPI','PostgreSQL','React'], thumb:'#2d0d1a', accent:'#C9A84C', desc:'Multilingual chatbot for Swahili, English, and French citizen services — reducing response time from 3 days to 5 minutes.', fullDesc:'A production NLP system serving citizen queries in three languages. Processes documents, extracts information, and routes intelligently to the correct government department. Handles 78% of common queries fully automatically.', results:['78% queries resolved automatically','Response time: 3 days → 5 minutes','3 languages: Swahili, English, French'] },
  { id:'agritrack',  title:'AgriTrack Mobile & API',           client:'FarmCo Cooperative', category:'Mobile', year:'2024', tags:['React Native','Node.js','PostgreSQL','Redis','OpenWeatherMap'], thumb:'#1a2d0d', accent:'#C9A84C', desc:'Offline-first mobile platform for 12,000 smallholder farmers tracking yields, weather, and live market prices.', fullDesc:'A mobile-first platform that works fully offline and syncs when connectivity is restored. Features weather forecasts, soil health tracking, live market price feeds, and cooperative logistics coordination across Kenya and Uganda.', results:['12,000 farmers onboarded','Full offline capability','Live market price feeds'] },
]

export const usePortfolioStore = defineStore('portfolio', () => {
  const filter   = ref('All')
  const filters  = ['All', 'Web', 'AI', 'Data', 'Mobile']
  const projects = ref(PROJECTS)
  const isLoaded = ref(false)

  const mapCategory = category => {
    if (!category) return 'Web'
    const normalized = String(category).trim()
    if (/ai|ml|machine|intelligence/i.test(normalized)) return 'AI'
    if (/data|analytics|warehouse|etl/i.test(normalized)) return 'Data'
    if (/mobile|android|ios/i.test(normalized)) return 'Mobile'
    if (/web|website|frontend|backend|full[- ]?stack/i.test(normalized)) return 'Web'
    return normalized
  }

  const toUiProject = item => {
    const firstImage = item.imageUrls?.[0]
    return {
      id: item.id,
      title: item.title,
      client: item.clientName || 'Confidential Client',
      category: mapCategory(item.category),
      year: '2026',
      tags: item.techStack ? String(item.techStack).split(',').map(t => t.trim()).filter(Boolean) : [],
      thumb: firstImage || '#1B3A5C',
      accent: '#C9A84C',
      desc: item.projectDescription || 'No description available yet.',
      fullDesc: item.projectDescription || 'No description available yet.',
      results: [
        `Status: ${item.status || 'In progress'}`,
        `Type: ${item.projectType || 'General'}`,
        item.projectLink ? 'Public project link available' : 'Private project details'
      ],
      projectLink: item.projectLink
    }
  }

  const fetchProjects = async () => {
    if (isLoaded.value) return
    try {
      const response = await projectApi.getAll()
      const data = Array.isArray(response?.data?.data) ? response.data.data : []
      if (data.length > 0) {
        projects.value = data.map(toUiProject)
      }
      isLoaded.value = true
    } catch (error) {
      console.error('[PortfolioStore] fetchProjects failed:', error)
    }
  }

  const filtered = computed(() => filter.value === 'All' ? projects.value : projects.value.filter(p => p.category === filter.value))
  const getById  = id => projects.value.find(p => p.id === id)
  return { filter, filters, projects, filtered, getById, fetchProjects }
})
