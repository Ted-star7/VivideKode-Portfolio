const REPLIES = [
  "Thanks for reaching out! 👋 I'm here to help. Could you tell me a bit more about your project?",
  "That sounds like an exciting challenge. Our team has deep expertise in that area — would you like to book a free discovery call?",
  "Great question! We start every engagement with a discovery session to understand your goals fully. Want me to help schedule one?",
  "We tailor every proposal individually — projects typically start from $5,000. Can you share more details for a better estimate?",
  "Our team is usually ready to kick off within 2–3 weeks. I can connect you directly with our lead engineer — call or email?",
  "You can also reach us at hello@vividkode.dev or book a consultation from the menu. We always respond within 24 hours!",
]

export class SimulatedWS {
  constructor() { this._cb = null; this._idx = 0 }
  connect()  { console.log('[WS] Simulated connection established') }
  on(_, cb)  { this._cb = cb }
  send(_txt) {
    setTimeout(() => {
      this._cb?.({ role: 'bot', text: REPLIES[this._idx++ % REPLIES.length], time: _now() })
    }, 1100 + Math.random() * 900)
  }
  disconnect() { console.log('[WS] Disconnected') }
}

export class ChatWebSocket {
  constructor(url = import.meta.env.VITE_WS_URL) {
    this._ws  = null; this._url = url; this._cb = null
  }
  connect() {
    if (!this._url) return console.warn('[WS] No VITE_WS_URL — using simulated mode')
    this._ws = new WebSocket(this._url)
    this._ws.onmessage = e => {
      try { this._cb?.(JSON.parse(e.data)) } catch { this._cb?.({ role:'bot', text: e.data, time: _now() }) }
    }
  }
  on(_, cb)  { this._cb = cb }
  send(text) { this._ws?.readyState === 1 && this._ws.send(JSON.stringify({ type:'message', text })) }
  disconnect() { this._ws?.close() }
}

function _now() { return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) }
