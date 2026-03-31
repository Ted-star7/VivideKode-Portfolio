# VividKode Creations — Portfolio Website

Premium, SEO-optimised, client-facing portfolio website for **VividKode Creations** — a Nairobi-based technology consultancy.

## Brand
- **Primary colour:** Navy `#1B3A5C`
- **Accent colour:**  Gold `#C9A84C`
- **Fonts:** Syne (display) · DM Sans (body) · DM Mono (labels)

---

## Tech Stack

| Layer       | Technology                                            |
|-------------|------------------------------------------------------|
| Framework   | Vue 3 (Composition API, `<script setup>`)            |
| Routing     | Vue Router 4 — lazy-loaded, SEO scroll-behaviour     |
| State       | Pinia stores (chat, portfolio, booking)              |
| Animations  | **GSAP 3** + ScrollTrigger — real scroll reveals     |
| HTTP        | Axios — centralised `services/api.service.js`        |
| WebSocket   | Simulated + real class `services/websocket.service.js`|
| Utilities   | VueUse `@vueuse/core`                                |
| Styling     | Tailwind CSS + scoped component styles               |
| SEO         | Full meta tags, OG, Twitter Card, Schema.org JSON-LD |
| Build       | Vite 5                                               |

---

## Quick Start

```bash
# 1 — Install dependencies
npm install

# 2 — Set environment variables
cp .env.example .env

# 3 — Run dev server
npm run dev

# 4 — Production build
npm run build
```

---

## Project Structure

```
src/
├── assets/
│   └── main.css                    # Tailwind + full CSS design system
│
├── composables/
│   ├── useGsap.js                  # GSAP composable (heroSequence, staggerReveal, slideIn…)
│   └── useSeo.js                   # Per-page SEO meta tag management
│
├── layouts/
│   └── PublicLayout.vue            # Navbar (VividKode SVG logo) + Footer + Chat widget
│
├── router/
│   └── index.js                    # All 7 public routes, lazy-loaded
│
├── services/
│   ├── api.service.js              # Axios instance + bookingApi + contactApi
│   └── websocket.service.js        # SimulatedWS (dev) + ChatWebSocket (production)
│
├── stores/
│   ├── chat.js                     # Pinia — WebSocket chat state
│   ├── portfolio.js                # Pinia — 6 project records + filter
│   └── booking.js                  # Pinia — consultation form + validation + submit
│
└── views/
    ├── HomeView.vue                 # Hero (GSAP) · Services · Process · Results · Work · Testimonials · CTA
    ├── AboutView.vue                # Story · MVV · Core Values · Team
    ├── ServicesView.vue             # 6 services with use cases · Tech stack · Why VividKode
    ├── PortfolioView.vue            # Filtered project grid + detail modal
    ├── ProjectView.vue              # Dynamic /portfolio/:id — full case study page
    ├── BookView.vue                 # Consultation booking form (Pinia store)
    └── ContactView.vue             # Contact form + info + map + social links
```

---

## Routes

| Route            | View               | Description                              |
|------------------|--------------------|------------------------------------------|
| `/`              | `HomeView`         | Landing page — full conversion experience |
| `/about`         | `AboutView`        | Company story, MVV, values, team          |
| `/services`      | `ServicesView`     | All 6 services with use cases + stack     |
| `/portfolio`     | `PortfolioView`    | Filterable project grid + modals         |
| `/portfolio/:id` | `ProjectView`      | Full project case study page             |
| `/book`          | `BookView`         | Consultation booking form                |
| `/contact`       | `ContactView`      | Contact form + map + social              |

---

## GSAP Animations

All animations live in `src/composables/useGsap.js` and are used consistently across all views:

| Method          | Effect                                              |
|-----------------|-----------------------------------------------------|
| `heroSequence`  | Staggered mount animation for hero elements         |
| `staggerReveal` | ScrollTrigger stagger for card grids                |
| `scrollReveal`  | ScrollTrigger single element fade-up                |
| `slideIn`       | Horizontal slide from left/right on scroll          |
| `countUp`       | Animated number counter on scroll                   |
| `parallax`      | Smooth parallax scroll effect                       |

---

## SEO

- Full `<meta>` tags on every page via `useSeo.js`
- Open Graph + Twitter Card tags
- Schema.org JSON-LD in `index.html` (Organization + WebSite)
- Semantic HTML5 — `<header>`, `<main>`, `<footer>`, `<article>`, `<aside>`, `<address>`, `<blockquote>`, `<cite>`, `<dl>`, `<section>` used correctly
- ARIA attributes — `aria-label`, `aria-current`, `aria-live`, `aria-modal`, `role` everywhere
- Skip-to-content link for keyboard accessibility
- Canonical URLs per page
- `:focus-visible` styling for keyboard navigation

---

## Activating Real Integrations

### Real API (Axios)
```bash
# Set in .env:
VITE_API_BASE_URL=https://api.vividkode.dev
```
Then in `stores/booking.js` and `views/ContactView.vue`, uncomment the real API calls.

### Real WebSocket
```bash
# Set in .env:
VITE_WS_URL=wss://api.vividkode.dev/chat
```
In `stores/chat.js`, swap `SimulatedWS` for `ChatWebSocket`:
```js
import { ChatWebSocket } from '@/services/websocket.service.js'
const ws = new ChatWebSocket()
```
# VivideKode-Portfolio
