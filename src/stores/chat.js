import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SimulatedWS } from '@/services/websocket.service.js'

const now = () => new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })

export const useChatStore = defineStore('chat', () => {
  const history = ref([{ role:'bot', text:"👋 Hi! Welcome to VividKode Creations. I'm here to help you explore our services or connect you with our team. What can I help you with today?", time: now() }])
  const input   = ref('')
  const typing  = ref(false)
  const open    = ref(false)
  const unread  = ref(1)

  const ws = new SimulatedWS()

  function connect() {
    ws.connect()
    ws.on('message', msg => {
      typing.value = false
      history.value.push({ role:'bot', text: msg.text, time: msg.time || now() })
      if (!open.value) unread.value++
    })
  }
  function disconnect() { ws.disconnect() }
  function toggle()     { open.value = !open.value; if (open.value) unread.value = 0 }
  function send() {
    const text = input.value.trim()
    if (!text) return
    history.value.push({ role:'user', text, time: now() })
    input.value  = ''
    typing.value = true
    ws.send(text)
  }

  return { history, input, typing, open, unread, connect, disconnect, toggle, send }
})
