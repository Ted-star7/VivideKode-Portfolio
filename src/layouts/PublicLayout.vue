<template>
  <div class="site">

    <!-- ══════════════════════════════════════════════ NAVBAR -->
    <header class="navbar" :class="{ 'navbar--scrolled': scrolled, 'navbar--solid': solidPages }">
      <div class="navbar__inner container">

        <!-- Logo -->
        <RouterLink to="/" class="navbar__logo" aria-label="VividKode Creations — Home">
          <!-- VK Monogram SVG from logo image -->
          <svg class="logo-mark" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- V shape -->
            <path d="M2 4 L20 44 L28 26 L36 44 L54 4" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <!-- K shape -->
            <path d="M36 44 L54 4" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/>
            <!-- Inner V detail -->
            <path d="M12 4 L20 24 L28 4" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.45"/>
          </svg>
          <div class="logo-text">
            <span class="logo-brand">VividKode</span>
            <span class="logo-sub">CREATIONS</span>
          </div>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="navbar__nav" role="navigation" aria-label="Main navigation">
          <RouterLink
            v-for="l in navLinks"
            :key="l.to"
            :to="l.to"
            class="nav-link gold-underline"
            :class="{ active: isActive(l.to) }"
            :aria-current="isActive(l.to) ? 'page' : undefined"
          >{{ l.label }}</RouterLink>
        </nav>

        <!-- Actions -->
        <div class="navbar__actions">
          <RouterLink to="/book" class="btn-navy btn btn-sm">Book Consultation</RouterLink>
          <button
            class="hamburger"
            :class="{ open: mobileOpen }"
            @click="mobileOpen = !mobileOpen"
            :aria-expanded="mobileOpen"
            aria-label="Toggle mobile menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <!-- Dim background when mobile menu is open -->
      <Transition name="mobile-backdrop">
        <div
          v-if="mobileOpen"
          class="mobile-nav-backdrop"
          aria-hidden="true"
          @click="mobileOpen = false"
        />
      </Transition>

      <!-- Mobile drawer -->
      <Transition name="mobile-drawer">
        <nav v-if="mobileOpen" class="mobile-nav" role="navigation" aria-label="Mobile navigation" @click="mobileOpen = false">
          <RouterLink v-for="l in navLinks" :key="l.to" :to="l.to" class="mobile-link">{{ l.label }}</RouterLink>
          <RouterLink to="/book" class="mobile-link mobile-link--cta">Book a Consultation →</RouterLink>
        </nav>
      </Transition>
    </header>

    <!-- ══════════════════════════════════════════════ MAIN -->
    <main id="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <!-- ══════════════════════════════════════════════ FOOTER (single instance) -->
    <footer class="site-footer" role="contentinfo" aria-label="Site footer">
      <div class="footer__inner container">

        <!-- Top grid -->
        <div class="footer__grid">
          <!-- Brand column -->
          <div class="footer__brand">
            <RouterLink to="/" class="footer__logo" aria-label="VividKode Creations">
              <svg class="footer-logo-mark" viewBox="0 0 56 48" fill="none" aria-hidden="true">
                <path d="M2 4 L20 44 L28 26 L36 44 L54 4" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M12 4 L20 24 L28 4" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.45"/>
              </svg>
              <div>
                <div class="footer-logo-brand">VividKode</div>
                <div class="footer-logo-sub">CREATIONS</div>
              </div>
            </RouterLink>
            <p class="footer__tagline">Building intelligent digital solutions for ambitious businesses across Africa and beyond.</p>
            <address class="footer__contact" style="font-style:normal">
              <a href="mailto:vividkode@gmail.com" class="footer__contact-link">vividkode@gmail.com</a>
              <a href="tel:+254705171490" class="footer__contact-link">+254 705 171 490</a>
              <span class="footer__contact-link">Nairobi, Kenya</span>
            </address>
            <!-- Socials -->
            <div class="footer__socials" aria-label="Social media links">
              <a v-for="s in socials" :key="s.label" :href="s.href" :aria-label="s.label" target="_blank" rel="noopener noreferrer" class="social-btn">{{ s.glyph }}</a>
            </div>
          </div>

          <!-- Links columns -->
          <div class="footer__links-wrap">
            <div class="footer__col" v-for="col in footerCols" :key="col.title">
              <h3 class="footer__col-title">{{ col.title }}</h3>
              <ul class="footer__col-list" role="list">
                <li v-for="item in col.items" :key="item.label">
                  <RouterLink v-if="item.to" :to="item.to" class="footer__col-link">{{ item.label }}</RouterLink>
                  <span v-else class="footer__col-link no-link">{{ item.label }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="vk-divider footer__divider" />

        <!-- Bottom bar -->
        <div class="footer__bottom">
          <p class="footer__copy">
            © {{ year }} VividKode Creations. All rights reserved. Crafted with purpose in Nairobi, Kenya.
          </p>
          <div class="footer__legal">
            <a href="#" class="footer__legal-link">Privacy Policy</a>
            <a href="#" class="footer__legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- ══════════════════════════════════════════════ CHAT WIDGET -->
    <div class="chat-widget" role="complementary" aria-label="Live chat">
      <Transition name="chat-pop">
        <div v-if="chat.open" class="chat-box" role="dialog" aria-labelledby="chat-heading" aria-modal="false">
          <div class="chat__head">
            <div class="chat__avatar" aria-hidden="true">
              <svg viewBox="0 0 56 48" fill="none" width="20" height="18">
                <path d="M2 4 L20 44 L28 26 L36 44 L54 4" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M12 4 L20 24 L28 4" stroke="rgba(255,255,255,0.5)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
            <div class="chat__agent">
              <span id="chat-heading" class="chat__agent-name">VividKode Support</span>
              <span class="chat__agent-status" aria-live="polite">
                <span class="online-dot" aria-hidden="true" />Online · replies instantly
              </span>
            </div>
            <button class="chat__close" @click="chat.toggle()" aria-label="Close chat">✕</button>
          </div>

          <div class="chat__messages" ref="chatEl" role="log" aria-live="polite" aria-label="Chat messages">
            <div v-for="(msg,i) in chat.history" :key="i" class="chat__msg" :class="msg.role">
              <div class="chat__bubble">{{ msg.text }}</div>
              <time class="chat__ts" :datetime="msg.time">{{ msg.time }}</time>
            </div>
            <div v-if="chat.typing" class="chat__msg bot" aria-label="Agent is typing">
              <div class="chat__bubble typing">
                <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
              </div>
            </div>
          </div>

          <div class="chat__input-row">
            <label for="chat-input" class="sr-only">Type a message</label>
            <input
              id="chat-input"
              v-model="chat.input"
              class="chat__input"
              placeholder="Type a message…"
              @keydown.enter.prevent="chat.send()"
              autocomplete="off"
            />
            <button class="chat__send" @click="chat.send()" :disabled="!chat.input.trim()" aria-label="Send message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </Transition>

      <div class="chat__fab-wrap">
        <button class="chat__fab" @click="chat.toggle()" :aria-label="chat.open ? 'Close chat' : 'Open live chat'">
          <Transition name="icon-swap" mode="out-in">
            <svg v-if="!chat.open" key="open" viewBox="0 0 56 48" fill="none" width="22" height="20" aria-hidden="true">
              <path d="M2 4 L20 44 L28 26 L36 44 L54 4" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <path d="M12 4 L20 24 L28 4" stroke="rgba(255,255,255,0.5)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
            <span v-else key="close" aria-hidden="true" style="font-size:1.1rem;line-height:1">✕</span>
          </Transition>
        </button>
        <Transition name="badge-pop">
          <span v-if="chat.unread > 0 && !chat.open" class="chat__badge" aria-label="Unread messages">{{ chat.unread }}</span>
        </Transition>
      </div>
    </div>

    <!-- Skip to main content (accessibility) -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat.js'

const route      = useRoute()
const chat       = useChatStore()
const mobileOpen = ref(false)
const scrolled   = ref(false)
const chatEl     = ref(null)
const year       = new Date().getFullYear()

// Pages with light (cream) background — navbar uses navy text
const solidPages = computed(() => route.name !== 'home')

const navLinks = [
  { to: '/',          label: 'Home'      },
  { to: '/about',     label: 'About'     },
  { to: '/services',  label: 'Services'  },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact',   label: 'Contact'   },
]

const socials = [
  { label: 'X (Twitter)',   glyph: '𝕏',  href: 'https://twitter.com/vividkode'           },
  { label: 'LinkedIn',      glyph: 'in', href: 'https://linkedin.com/company/vividkode'   },
  { label: 'GitHub',        glyph: 'gh', href: 'https://github.com/vividkode'             },
]

const footerCols = [
  {
    title: 'Company',
    items: [
      { label: 'About Us',    to: '/about'     },
      { label: 'Portfolio',   to: '/portfolio' },
      { label: 'Services',    to: '/services'  },
      { label: 'Contact',     to: '/contact'   },
      { label: 'Book a Call', to: '/book'      },
    ]
  },
  {
    title: 'Services',
    items: [
      { label: 'Web Development'   },
      { label: 'Data Science'      },
      { label: 'AI Solutions'      },
      { label: 'Data Engineering'  },
      { label: 'Custom Software'   },
      { label: 'API Development'   },
    ]
  },
  {
    title: 'Contact',
    items: [
      { label: 'vividkode@gmail.com' },
      { label: '+254 705 171 490'    },
      { label: 'Mon–Fri, 8am–6pm EAT' },
      { label: 'Nairobi, Kenya'  },
    ]
  }
]

function isActive(to) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

function onScroll() { scrolled.value = window.scrollY > 40 }

watch(() => chat.history.length, async () => {
  await nextTick()
  if (chatEl.value) chatEl.value.scrollTop = chatEl.value.scrollHeight
})

watch(route, () => { mobileOpen.value = false })

watch(mobileOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  chat.connect()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  chat.disconnect()
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── Skip link (accessibility) ─────────────────────────────── */
.skip-link {
  position: absolute; top: -100px; left: 1rem;
  background: var(--navy); color: #fff;
  padding: 0.5rem 1rem; border-radius: 6px;
  font-size: 0.85rem; font-weight: 600;
  transition: top 0.2s; z-index: 9999;
}
.skip-link:focus { top: 1rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

/* ── Site shell ───────────────────────────────────────────── */
.site { display: flex; flex-direction: column; min-height: 100vh; }
#main-content { flex: 1; padding-top: var(--nav-h); }

/* ── Navbar ───────────────────────────────────────────────── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 900;
  height: var(--nav-h);
  background: transparent;
  transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s;
  border-bottom: 1px solid transparent;
}
.navbar--scrolled,
.navbar--solid {
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border), 0 4px 20px rgba(27,58,92,0.07);
  border-bottom-color: var(--border);
}
.navbar__inner {
  display: flex; align-items: center;
  height: 100%; padding: 0 2rem; gap: 2rem;
}

/* Logo */
.navbar__logo {
  display: flex; align-items: center; gap: 0.65rem;
  text-decoration: none; flex-shrink: 0;
}
.logo-mark {
  width: 36px; height: 32px;
  color: var(--navy);
  transition: color 0.2s;
}
.logo-text { display: flex; flex-direction: column; line-height: 1; }
.logo-brand {
  font-family: 'Syne', sans-serif;
  font-size: 1.2rem; font-weight: 800;
  color: var(--navy); letter-spacing: -0.02em;
}
.logo-sub {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.22em;
  color: var(--gold); font-weight: 500;
  margin-top: 1px;
}

/* Nav links */
.navbar__nav { display: flex; gap: 0.2rem; flex: 1; justify-content: center; }
.nav-link {
  font-size: 0.875rem; font-weight: 500;
  color: var(--navy); padding: 0.45rem 0.9rem;
  border-radius: 8px; text-decoration: none;
  transition: color 0.2s, background 0.2s;
  position: relative;
}
.nav-link:hover { color: var(--navy); background: rgba(27,58,92,0.06); }
.nav-link.router-link-active, .nav-link.active { color: var(--gold-dark); font-weight: 600; }
.nav-link.gold-underline::after { bottom: -2px; }

/* Transparent navbar — white text on hero */
.navbar:not(.navbar--scrolled):not(.navbar--solid) .logo-mark { color: #fff; }
.navbar:not(.navbar--scrolled):not(.navbar--solid) .logo-brand { color: #fff; }
.navbar:not(.navbar--scrolled):not(.navbar--solid) .nav-link { color: rgba(255,255,255,0.88); }
.navbar:not(.navbar--scrolled):not(.navbar--solid) .nav-link:hover { color: #fff; background: rgba(255,255,255,0.1); }
.navbar:not(.navbar--scrolled):not(.navbar--solid) .nav-link.active { color: var(--gold-light); }

.navbar__actions { display: flex; align-items: center; gap: 0.75rem; }

/* Hamburger */
.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 6px;
  border-radius: 8px; transition: background 0.18s;
}
.hamburger:hover { background: rgba(27,58,92,0.08); }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--navy); border-radius: 2px; transition: 0.3s; }
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

/* Hero / transparent navbar: hamburger must stay visible on dark background */
.navbar:not(.navbar--scrolled):not(.navbar--solid) .hamburger span { background: #fff; }
.navbar:not(.navbar--scrolled):not(.navbar--solid) .hamburger:hover { background: rgba(255,255,255,0.12); }

/* Mobile drawer backdrop */
.mobile-nav-backdrop {
  position: fixed;
  inset: 0;
  top: var(--nav-h);
  z-index: 898;
  background: rgba(18, 40, 64, 0.45);
  backdrop-filter: blur(2px);
}
.mobile-backdrop-enter-active,
.mobile-backdrop-leave-active { transition: opacity 0.2s ease; }
.mobile-backdrop-enter-from,
.mobile-backdrop-leave-to { opacity: 0; }

/* Mobile drawer */
.mobile-nav {
  position: absolute; top: 100%; left: 0; right: 0;
  z-index: 901;
  max-height: min(70vh, calc(100dvh - var(--nav-h)));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: rgba(255,255,255,0.99);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 1.5rem 1.5rem;
  display: flex; flex-direction: column; gap: 0.1rem;
  box-shadow: var(--shadow-md);
}
.mobile-link {
  display: block; padding: 0.75rem 0.9rem; border-radius: 10px;
  color: var(--navy); font-size: 0.95rem; font-weight: 500;
  text-decoration: none; transition: background 0.18s, color 0.18s;
}
.mobile-link:hover { background: rgba(27,58,92,0.06); }
.mobile-link--cta { color: var(--gold-dark); font-weight: 700; margin-top: 0.5rem; }
.mobile-drawer-enter-active, .mobile-drawer-leave-active { transition: opacity 0.22s, transform 0.22s; }
.mobile-drawer-enter-from, .mobile-drawer-leave-to { opacity: 0; transform: translateY(-12px); }

/* ── Footer ───────────────────────────────────────────────── */
.site-footer {
  background: var(--navy);
  color: rgba(255,255,255,0.85);
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 1.5rem) 0;
  overflow-x: clip;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
.footer__inner {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
.footer__inner .footer__grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding-bottom: clamp(2.5rem, 6vw, 4rem);
  min-width: 0;
}
.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
}
.footer__logo {
  display: inline-flex; align-items: center; gap: 0.65rem;
  text-decoration: none;
}
.footer-logo-mark { width: 32px; height: 28px; color: var(--gold); }
.footer-logo-brand {
  font-family: 'Syne', sans-serif;
  font-size: 1.15rem; font-weight: 800; color: #fff; letter-spacing: -0.02em;
}
.footer-logo-sub {
  font-family: 'DM Mono', monospace;
  font-size: 0.58rem; letter-spacing: 0.22em; color: var(--gold); font-weight: 500;
}
.footer__tagline { font-size: 0.875rem; line-height: 1.75; color: rgba(255,255,255,0.6); max-width: 300px; }
.footer__contact { display: flex; flex-direction: column; gap: 0.4rem; }
.footer__contact-link {
  font-size: 0.85rem; color: rgba(255,255,255,0.65); text-decoration: none;
  transition: color 0.18s;
}
.footer__contact-link:hover { color: var(--gold-light); }
.footer__socials { display: flex; gap: 0.5rem; }
.social-btn {
  width: 38px; height: 38px; border-radius: 9px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Mono', monospace; font-size: 0.78rem;
  color: rgba(255,255,255,0.65); text-decoration: none;
  transition: background 0.18s, border-color 0.18s, color 0.18s;
}
.social-btn:hover { background: rgba(201,168,76,0.18); border-color: rgba(201,168,76,0.4); color: var(--gold-light); }

.footer__links-wrap {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.25rem, 4vw, 2rem);
  min-width: 0;
}
.footer__col { min-width: 0; }
.footer__col-title {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 1.1rem; font-weight: 500;
}
.footer__col-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.footer__col-link {
  font-size: 0.875rem; color: rgba(255,255,255,0.65); text-decoration: none;
  transition: color 0.18s; cursor: pointer; display: inline-block;
}
.footer__col-link:hover { color: rgba(255,255,255,0.95); }
.footer__col-link.no-link { cursor: default; }
.footer__col-link.no-link:hover { color: rgba(255,255,255,0.65); }
.footer__divider { background: rgba(255,255,255,0.1); }
.footer__bottom {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.5rem 0 clamp(1.5rem, 4vw, 2rem); gap: 1rem; flex-wrap: wrap;
}
.footer__copy {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.45);
  max-width: 100%;
  line-height: 1.5;
}
.footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
}
.footer__legal-link { font-size: 0.8rem; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.18s; }
.footer__legal-link:hover { color: var(--gold-light); }

/* ── Chat Widget ──────────────────────────────────────────── */
.chat-widget {
  position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 1000;
  display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem;
}
.chat-box {
  width: 360px;
  background: #fff;
  border: 1px solid var(--border-md);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  display: flex; flex-direction: column;
}
.chat__head {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--navy);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.chat__avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(201,168,76,0.25);
  border: 1.5px solid rgba(201,168,76,0.5);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.chat__agent { flex: 1; }
.chat__agent-name   { display: block; font-size: 0.88rem; font-weight: 700; color: #fff; }
.chat__agent-status { display: flex; align-items: center; gap: 0.35rem; font-size: 0.7rem; color: rgba(255,255,255,0.65); margin-top: 0.1rem; }
.online-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; flex-shrink: 0; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
.chat__close { background: none; border: none; color: rgba(255,255,255,0.55); font-size: 0.95rem; cursor: pointer; padding: 4px; transition: color 0.18s; }
.chat__close:hover { color: #fff; }
.chat__messages {
  flex: 1; max-height: 320px; min-height: 220px; overflow-y: auto;
  padding: 1.1rem; display: flex; flex-direction: column; gap: 0.85rem;
}
.chat__messages::-webkit-scrollbar { width: 3px; }
.chat__messages::-webkit-scrollbar-thumb { background: var(--border-md); }
.chat__msg { display: flex; flex-direction: column; max-width: 84%; }
.chat__msg.bot  { align-self: flex-start; }
.chat__msg.user { align-self: flex-end; align-items: flex-end; }
.chat__bubble {
  padding: 0.65rem 0.95rem; border-radius: 14px;
  font-size: 0.84rem; line-height: 1.6; color: var(--body-text);
}
.chat__msg.bot .chat__bubble  { background: var(--cream); border: 1px solid var(--border); border-bottom-left-radius: 3px; }
.chat__msg.user .chat__bubble { background: var(--navy); color: #fff; border-bottom-right-radius: 3px; }
.chat__ts { font-size: 0.64rem; color: var(--dim); margin-top: 0.2rem; font-family: 'DM Mono', monospace; }
.typing { display: flex; align-items: center; gap: 4px; }
.typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--dim); animation: td 1.2s infinite; }
.typing span:nth-child(2) { animation-delay: 0.17s; }
.typing span:nth-child(3) { animation-delay: 0.34s; }
@keyframes td { 0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-5px); } }
.chat__input-row {
  display: flex; gap: 0.5rem;
  padding: 0.9rem 1.1rem; border-top: 1px solid var(--border);
}
.chat__input {
  flex: 1; background: var(--cream); border: 1.5px solid var(--border-md);
  border-radius: 10px; padding: 0.6rem 0.9rem;
  color: var(--body-text); font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
  outline: none; transition: border-color 0.18s;
}
.chat__input:focus { border-color: var(--navy); }
.chat__input::placeholder { color: var(--dim); }
.chat__send {
  width: 36px; height: 36px; border-radius: 9px;
  background: var(--navy); border: none; color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; align-self: center;
  transition: background 0.18s, transform 0.15s;
}
.chat__send:hover:not(:disabled) { background: var(--navy-light); transform: scale(1.06); }
.chat__send:disabled { opacity: 0.4; cursor: not-allowed; }
.chat__fab-wrap { position: relative; }
.chat__fab {
  width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg, var(--navy), var(--navy-light));
  border: 3px solid rgba(201,168,76,0.5);
  color: #fff; cursor: pointer;
  box-shadow: 0 8px 28px rgba(27,58,92,0.38), 0 0 0 6px rgba(201,168,76,0.1);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s;
}
.chat__fab:hover { transform: scale(1.1); box-shadow: 0 12px 38px rgba(27,58,92,0.48), 0 0 0 8px rgba(201,168,76,0.15); }
.chat__badge {
  position: absolute; top: -3px; right: -3px;
  min-width: 18px; height: 18px; border-radius: 9px;
  background: var(--gold); border: 2px solid #fff;
  font-size: 0.6rem; font-weight: 700; color: var(--navy-dark);
  display: flex; align-items: center; justify-content: center;
  padding: 0 3px;
}
.chat-pop-enter-active, .chat-pop-leave-active { transition: opacity 0.25s, transform 0.25s cubic-bezier(0.34,1.2,0.64,1); }
.chat-pop-enter-from, .chat-pop-leave-to { opacity: 0; transform: translateY(20px) scale(0.94); }
.icon-swap-enter-active, .icon-swap-leave-active { transition: opacity 0.12s, transform 0.12s; }
.icon-swap-enter-from, .icon-swap-leave-to { opacity: 0; transform: rotate(-80deg) scale(0.6); }
.badge-pop-enter-active, .badge-pop-leave-active { transition: opacity 0.2s, transform 0.2s; }
.badge-pop-enter-from, .badge-pop-leave-to { opacity: 0; transform: scale(0.4); }

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 900px) {
  .footer__inner .footer__grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .footer__links-wrap { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
/* Tablet + mobile: primary navigation in drawer (hamburger) */
@media (max-width: 1024px) {
  .navbar__nav,
  .navbar__actions .btn-navy { display: none; }
  .hamburger { display: flex; }
  .navbar__inner { padding: 0 1rem; gap: 1rem; }
}
@media (max-width: 768px) {
  .chat-box  { width: min(100vw - 2rem, 300px); }
}
@media (max-width: 480px) {
  .footer__links-wrap { grid-template-columns: 1fr; }
  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
  .footer__legal { width: 100%; flex-direction: column; align-items: flex-start; }
  .chat-widget { bottom: 1rem; right: 1rem; max-width: calc(100vw - 2rem); }
}
</style>
