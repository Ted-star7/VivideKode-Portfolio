<template>
  <div class="home">

    <!-- ══ HERO ════════════════════════════════════════════════ -->
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero__bg">
        <!-- Geometric grid pattern -->
        <div class="hero__grid" aria-hidden="true" />
        <!-- Gradient orbs -->
        <div class="hero__orb hero__orb--1" aria-hidden="true" />
        <div class="hero__orb hero__orb--2" aria-hidden="true" />
        <!-- Floating VK shapes -->
        <div class="hero__float-vk" aria-hidden="true">
          <svg viewBox="0 0 120 100" fill="none" opacity="0.06">
            <path d="M4 8 L40 92 L56 52 L72 92 L108 8" stroke="#C9A84C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="hero__inner container">
        <div class="hero__content">
          <!-- Eyebrow -->
          <div class="hero__eyebrow" ref="heroEyebrow" aria-label="Established Nairobi 2024">
            <span class="eyebrow-bar" aria-hidden="true" />
            <span class="eyebrow">Est. Nairobi · 2024</span>
          </div>

          <!-- Headline -->
          <h1 class="hero__h1" id="hero-heading" ref="heroTitle">
            Building <em class="hero__accent">Intelligent</em><br/>
            Digital Solutions
          </h1>

          <!-- Sub -->
          <p class="hero__sub body-lg" ref="heroSub">
            We craft world-class websites, AI systems, and data pipelines
            that help ambitious businesses across Africa scale faster and smarter.
          </p>

          <!-- CTAs -->
          <div class="hero__ctas" ref="heroCtas">
            <RouterLink to="/portfolio" class="btn-gold btn btn-lg">View Our Work</RouterLink>
            <RouterLink to="/book" class="btn-outline-white btn btn-lg">Book Free Consultation</RouterLink>
          </div>

          <!-- Stats -->
          <div class="hero__stats" ref="heroStats" aria-label="Company statistics">
            <div class="hero-stat" v-for="s in stats" :key="s.label">
              <div class="hero-stat__num" :ref="el => statEls[s.label] = el" :data-target="s.raw">
                {{ s.num }}
              </div>
              <div class="hero-stat__label">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <!-- Hero visual -->
        <div class="hero__visual" ref="heroVisual" aria-hidden="true">
          <div class="hero-card hero-card--main">
            <div class="hc-header">
              <div class="hc-dot" style="background:#ff6b6b" /><div class="hc-dot" style="background:#ffd166" /><div class="hc-dot" style="background:#4ade80" />
            </div>
            <div class="hc-body">
              <div class="hc-line hc-line--gold w-3/4" />
              <div class="hc-line w-full" />
              <div class="hc-line w-5/6" />
              <div class="hc-spacer" />
              <div class="hc-row">
                <div class="hc-badge">AI</div>
                <div class="hc-badge hc-badge--outline">Vue 3</div>
                <div class="hc-badge hc-badge--gold">Python</div>
              </div>
              <div class="hc-spacer" />
              <div class="hc-chart">
                <div v-for="(h,i) in [65,88,52,95,72,84]" :key="i" class="hc-bar" :style="{ height: h + '%', animationDelay: i*0.1 + 's' }" />
              </div>
            </div>
          </div>
          <!-- Floating cards -->
          <div class="hero-float hero-float--1">
            <div class="hf-icon">🚀</div>
            <div class="hf-text">
              <div class="hf-title">Project Launched</div>
              <div class="hf-sub">NexaRetail Analytics</div>
            </div>
          </div>
          <div class="hero-float hero-float--2">
            <div class="hf-icon">📈</div>
            <div class="hf-text">
              <div class="hf-title">+40% Revenue</div>
              <div class="hf-sub">Zawadi Platform</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <a href="#services-section" class="hero__scroll" aria-label="Scroll down to services">
        <span class="hs-text">Scroll to explore</span>
        <div class="hs-line" aria-hidden="true" />
      </a>
    </section>

    <!-- ══ SERVICES ════════════════════════════════════════════ -->
    <section class="section section-lg" id="services-section" aria-labelledby="services-heading">
      <div class="container">
        <div class="section-header" ref="servicesHeader">
          <div class="eyebrow">What We Do</div>
          <h2 class="heading-lg" id="services-heading">End-to-End Technology<br/>Expertise</h2>
          <p class="body-lg section-sub">Six specialisations. One integrated team. Zero compromise on quality.</p>
        </div>

        <div class="services-grid" ref="servicesGrid">
          <article
            v-for="svc in services"
            :key="svc.title"
            class="svc-card vk-card vk-card-hover"
          >
            <div class="svc-card__icon" :style="{ background: svc.iconBg }">
              <span aria-hidden="true">{{ svc.icon }}</span>
            </div>
            <h3 class="svc-card__title heading-md">{{ svc.title }}</h3>
            <p class="svc-card__desc body-sm">{{ svc.desc }}</p>
            <RouterLink to="/services" class="svc-card__link" :aria-label="`Learn more about ${svc.title}`">
              Learn more <span aria-hidden="true">→</span>
            </RouterLink>
            <div class="svc-card__accent" aria-hidden="true" />
          </article>
        </div>

        <div class="section-footer-cta" ref="servicesCta">
          <RouterLink to="/services" class="btn-navy btn">Explore All Services →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ══ PROCESS ══════════════════════════════════════════════ -->
    <section class="section process-section" aria-labelledby="process-heading">
      <div class="container">
        <div class="section-header" ref="processHeader">
          <div class="eyebrow">How We Work</div>
          <h2 class="heading-lg" id="process-heading">A Process Built<br/>for Results</h2>
        </div>
        <div class="process-grid" ref="processGrid">
          <div class="process-step" v-for="(step, i) in process" :key="step.num">
            <div class="process-step__num">{{ step.num }}</div>
            <div class="process-step__connector" v-if="i < process.length - 1" aria-hidden="true" />
            <h3 class="process-step__title">{{ step.title }}</h3>
            <p class="process-step__desc body-sm">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ RESULTS STRIP ════════════════════════════════════════ -->
    <section class="results-strip" aria-labelledby="results-heading">
      <div class="container">
        <div class="results-grid" ref="resultsGrid">
          <div class="result-item" v-for="r in results" :key="r.label">
            <div class="result-item__num">{{ r.val }}</div>
            <div class="result-item__label">{{ r.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ FEATURED WORK ════════════════════════════════════════ -->
    <section class="section section-lg" aria-labelledby="work-heading">
      <div class="container">
        <div class="section-header" ref="workHeader">
          <div class="eyebrow">Featured Work</div>
          <h2 class="heading-lg" id="work-heading">Projects That<br/>Define Us</h2>
          <p class="body-lg section-sub">A selection of our most impactful engagements.</p>
        </div>
        <div class="work-grid" ref="workGrid">
          <article
            v-for="p in featuredProjects"
            :key="p.id"
            class="work-card"
            @click="router.push(`/portfolio/${p.id}`)"
            :aria-label="`View ${p.title} project`"
            role="button"
            tabindex="0"
            @keydown.enter="router.push(`/portfolio/${p.id}`)"
          >
            <div class="work-card__thumb" :style="{ background: p.thumb }">
              <div class="work-card__overlay" />
              <span class="work-card__cat" :style="{ color: p.accent }">{{ p.category }}</span>
              <h3 class="work-card__title">{{ p.title }}</h3>
            </div>
            <div class="work-card__body">
              <p class="work-card__desc body-sm">{{ p.desc }}</p>
              <div class="work-card__tags">
                <span class="vk-badge" v-for="t in p.tags.slice(0,3)" :key="t">{{ t }}</span>
              </div>
              <span class="work-card__link">View Case Study →</span>
            </div>
          </article>
        </div>
        <div class="section-footer-cta" ref="workCta">
          <RouterLink to="/portfolio" class="btn-outline-navy btn">View All Projects →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ══ TESTIMONIALS ══════════════════════════════════════════ -->
    <section class="section section-alt" aria-labelledby="testimonials-heading">
      <div class="container">
        <div class="section-header" ref="testiHeader">
          <div class="eyebrow">Client Stories</div>
          <h2 class="heading-lg" id="testimonials-heading">What Our Clients Say</h2>
        </div>
        <div class="testi-grid" ref="testiGrid">
          <blockquote class="testi-card vk-card" v-for="t in testimonials" :key="t.name">
            <div class="testi-card__stars" aria-label="5 stars">★★★★★</div>
            <p class="testi-card__quote body-md">"{{ t.text }}"</p>
            <footer class="testi-card__author">
              <div class="testi-card__av" :style="{ background: t.bg }" aria-hidden="true">{{ t.initials }}</div>
              <div>
                <cite class="testi-card__name">{{ t.name }}</cite>
                <div class="testi-card__role">{{ t.role }}</div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ══ CTA BANNER ════════════════════════════════════════════ -->
    <section class="cta-banner" ref="ctaBanner" aria-labelledby="cta-heading">
      <div class="cta-banner__inner container">
        <div class="cta-banner__text">
          <div class="eyebrow" style="color:var(--gold-light)">Ready to Start?</div>
          <h2 class="cta-banner__h2 heading-lg" id="cta-heading" style="color:#fff">
            Let's Build Something<br/><em style="color:var(--gold)">Remarkable Together</em>
          </h2>
          <p style="color:rgba(255,255,255,0.7);font-size:1rem;line-height:1.75">
            Tell us about your project. We respond within 24 hours and always offer a free first call.
          </p>
        </div>
        <div class="cta-banner__actions">
          <RouterLink to="/book" class="btn-gold btn btn-lg">Book Free Consultation →</RouterLink>
          <RouterLink to="/contact" class="btn-outline-white btn btn-lg">Get in Touch</RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useGsap } from '@/composables/useGsap.js'
import { useSeo }  from '@/composables/useSeo.js'
import { usePortfolioStore } from '@/stores/portfolio.js'
import { testimonialApi } from '@/services/api.service.js'

useSeo({
  title: 'Intelligent Digital Solutions — Web, AI & Data',
  description: 'VividKode Creations builds world-class websites, AI solutions, data pipelines, and custom software for ambitious businesses across Africa.',
  canonical: '/',
})

const router   = useRouter()
const portfolio = usePortfolioStore()
const { gsap, heroSequence, staggerReveal, slideIn, scrollReveal } = useGsap()

// Refs for GSAP targets
const heroEyebrow  = ref(null)
const heroTitle    = ref(null)
const heroSub      = ref(null)
const heroCtas     = ref(null)
const heroStats    = ref(null)
const heroVisual   = ref(null)
const servicesHeader = ref(null)
const servicesGrid   = ref(null)
const servicesCta    = ref(null)
const processHeader  = ref(null)
const processGrid    = ref(null)
const resultsGrid    = ref(null)
const workHeader     = ref(null)
const workGrid       = ref(null)
const workCta        = ref(null)
const testiHeader    = ref(null)
const testiGrid      = ref(null)
const ctaBanner      = ref(null)
const statEls        = reactive({})

const stats = [
  { num: '50+',  label: 'Projects Delivered',  raw: 50  },
  { num: '98%',  label: 'Client Satisfaction', raw: 98  },
  { num: '5+',   label: 'Years Expertise',     raw: 5   },
  { num: '12k+', label: 'End Users Served',    raw: 12  },
]

const services = [
  { icon: '🌐', title: 'Website Development',       desc: 'Modern, performant websites and web applications that convert visitors into customers.', iconBg: 'rgba(27,58,92,0.08)'  },
  { icon: '📊', title: 'Data Science & Analytics',  desc: 'Transform raw data into intelligence — dashboards, forecasts, and predictive models.', iconBg: 'rgba(201,168,76,0.1)' },
  { icon: '🤖', title: 'AI Solutions',              desc: 'Production ML — NLP, computer vision, LLM integrations, and recommendation engines.',   iconBg: 'rgba(27,58,92,0.08)'  },
  { icon: '🗄️', title: 'Data Engineering',          desc: 'Robust pipelines and data warehouses that scale and ensure quality at every step.',      iconBg: 'rgba(201,168,76,0.1)' },
  { icon: '⚙️', title: 'Custom Software',           desc: 'Bespoke solutions built around your workflows — fully documented, fully supported.',     iconBg: 'rgba(27,58,92,0.08)'  },
  { icon: '🔌', title: 'API Development',           desc: 'High-performance, secure APIs that connect your systems and power your products.',       iconBg: 'rgba(201,168,76,0.1)' },
]

const process = [
  { num: '01', title: 'Discovery',  desc: 'Deep-dive into your goals, constraints, and existing systems.' },
  { num: '02', title: 'Strategy',   desc: 'Architecture, tech stack, and project roadmap defined together.' },
  { num: '03', title: 'Build',      desc: 'Agile sprints with frequent demos and continuous feedback loops.' },
  { num: '04', title: 'Launch',     desc: 'Deployment, QA testing, and performance optimisation.' },
  { num: '05', title: 'Support',    desc: 'Ongoing maintenance, monitoring, and iterative improvements.' },
]

const results = [
  { val: '$2M+',   label: 'Client Value Generated' },
  { val: '50+',    label: 'Projects Shipped'        },
  { val: '98%',    label: 'On-Time Delivery'        },
  { val: '100%',   label: 'Client Retention Rate'   },
]

const defaultTestimonials = [
  { text: 'VividKode transformed our data infrastructure completely. What took our team days now runs in minutes. ROI was visible within the first month of deployment.', name: 'Amara Osei', role: 'Head of Analytics, FinTech Africa', initials: 'AO', bg: 'linear-gradient(135deg,#1B3A5C,#234B78)' },
  { text: 'They built our entire e-commerce platform with a custom recommendation engine. Sales increased 40% in Q1 after launch. The quality and communication were outstanding.', name: 'Priya Nair', role: 'Founder & CEO, StyleKe', initials: 'PN', bg: 'linear-gradient(135deg,#A8882E,#C9A84C)' },
  { text: 'Working with VividKode felt like having a world-class engineering team embedded in our organisation. On time, on budget, and genuinely invested in our success.', name: 'David Kimani', role: 'CTO, HealthBridge', initials: 'DK', bg: 'linear-gradient(135deg,#1B3A5C,#234B78)' },
]
const testimonials = ref(defaultTestimonials)

const featuredProjects = computed(() => portfolio.projects.slice(0, 3))

onMounted(async () => {
  await portfolio.fetchProjects()
  try {
    const response = await testimonialApi.getAll()
    const data = Array.isArray(response?.data?.data) ? response.data.data : []
    if (data.length > 0) {
      testimonials.value = data.map((item, idx) => {
        const initials = String(item.name || 'Client')
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map(part => part[0]?.toUpperCase() || '')
          .join('')
        return {
          text: item.message || '',
          name: item.name || 'Client',
          role: `Client Rating: ${item.rate ?? 5}/5`,
          initials: initials || 'CL',
          bg: idx % 2 === 0
            ? 'linear-gradient(135deg,#1B3A5C,#234B78)'
            : 'linear-gradient(135deg,#A8882E,#C9A84C)'
        }
      })
    }
  } catch (error) {
    console.error('[HomeView] testimonials fetch failed:', error)
  }

  // ── Hero sequence with GSAP ─────────────────────────────────
  heroSequence(
    [heroEyebrow.value, heroTitle.value, heroSub.value, heroCtas.value, heroStats.value],
    { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.2 } }
  )

  // Hero visual slides in from right
  gsap.fromTo(heroVisual.value,
    { opacity: 0, x: 60, scale: 0.92 },
    { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.5 }
  )

  // ── Floating card animations ─────────────────────────────────
  gsap.to('.hero-float--1', { y: -12, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true })
  gsap.to('.hero-float--2', { y: -8, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.8 })

  // ── Scroll-triggered sections ────────────────────────────────
  scrollReveal(servicesHeader.value, { y: 40 })
  staggerReveal(servicesGrid.value ? [...servicesGrid.value.children] : [], { y: 50, stagger: 0.1 })
  scrollReveal(servicesCta.value)

  scrollReveal(processHeader.value, { y: 40 })
  staggerReveal(processGrid.value ? [...processGrid.value.children] : [], { y: 40, stagger: 0.12 })

  staggerReveal(resultsGrid.value ? [...resultsGrid.value.children] : [], { y: 30, stagger: 0.1 })

  scrollReveal(workHeader.value, { y: 40 })
  staggerReveal(workGrid.value ? [...workGrid.value.children] : [], { y: 50, stagger: 0.14 })
  scrollReveal(workCta.value)

  scrollReveal(testiHeader.value, { y: 40 })
  staggerReveal(testiGrid.value ? [...testiGrid.value.children] : [], { y: 40, stagger: 0.12 })

  scrollReveal(ctaBanner.value, { y: 40, scale: 0.98 })

  // ── Bar chart animation in hero card ─────────────────────────
  gsap.fromTo('.hc-bar',
    { scaleY: 0 },
    { scaleY: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 1.2, transformOrigin: 'bottom' }
  )
})
</script>

<style scoped>
/* ── Hero ─────────────────────────────────────────────────── */
.home { }
.hero {
  min-height: 100vh;
  background: linear-gradient(165deg, var(--navy-dark) 0%, var(--navy) 45%, #1e4a7a 100%);
  display: flex; align-items: center; position: relative; overflow: hidden;
  padding: 0 1.5rem;
}
.hero__bg { position: absolute; inset: 0; pointer-events: none; }
.hero__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px);
  background-size: 64px 64px;
}
.hero__orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); pointer-events: none;
}
.hero__orb--1 { width: 500px; height: 500px; background: rgba(201,168,76,0.1); top: -120px; right: 10%; }
.hero__orb--2 { width: 400px; height: 400px; background: rgba(255,255,255,0.04); bottom: -60px; left: 5%; }
.hero__float-vk { position: absolute; bottom: 10%; right: 2%; width: 280px; height: 240px; pointer-events: none; }

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding-top: var(--nav-h);
  min-height: 100vh;
  padding-bottom: 5rem;
}

/* Hero content */
.hero__content { }
.hero__eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.75rem; }
.eyebrow-bar   { width: 28px; height: 2px; background: var(--gold); border-radius: 1px; }

.hero__h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.6rem, 5.5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.0;
  color: #fff;
  margin-bottom: 1.5rem;
  font-style: normal;
}
.hero__accent {
  color: var(--gold);
  font-style: normal;
}
.hero__sub { color: rgba(255,255,255,0.72); max-width: 520px; margin-bottom: 2.5rem; }
.hero__ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3.5rem; }
.hero__stats { display: flex; gap: 2.5rem; flex-wrap: wrap; }
.hero-stat__num {
  font-family: 'Syne', sans-serif;
  font-size: 2rem; font-weight: 800;
  color: var(--gold); line-height: 1;
  margin-bottom: 0.25rem;
}
.hero-stat__label { font-size: 0.78rem; color: rgba(255,255,255,0.55); letter-spacing: 0.03em; }

/* Hero visual card */
.hero__visual { position: relative; }
.hero-card--main {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  backdrop-filter: blur(16px);
  overflow: hidden;
}
.hc-header  { display: flex; gap: 6px; padding: 1rem 1.25rem 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.hc-dot     { width: 10px; height: 10px; border-radius: 50%; }
.hc-body    { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; }
.hc-line    { height: 8px; background: rgba(255,255,255,0.12); border-radius: 4px; }
.hc-line--gold { background: rgba(201,168,76,0.4); }
.hc-spacer  { height: 0.25rem; }
.hc-row     { display: flex; gap: 0.4rem; }
.hc-badge   { font-family:'DM Mono',monospace; font-size:0.68rem; padding:0.25rem 0.6rem; border-radius:5px; background:rgba(27,58,92,0.6); color:rgba(255,255,255,0.8); border:1px solid rgba(255,255,255,0.15); }
.hc-badge--outline { background:transparent; border-color:rgba(255,255,255,0.25); }
.hc-badge--gold    { background:rgba(201,168,76,0.2); color:var(--gold-light); border-color:rgba(201,168,76,0.35); }
.hc-chart   { display: flex; align-items: flex-end; gap: 5px; height: 60px; padding-top: 0.5rem; }
.hc-bar     {
  flex: 1; border-radius: 4px 4px 0 0; transform-origin: bottom;
  background: linear-gradient(to top, rgba(201,168,76,0.8), rgba(201,168,76,0.3));
  animation: barGrow 0.8s ease forwards;
}
@keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }

/* Floating mini cards */
.hero-float {
  position: absolute;
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 12px; padding: 0.6rem 0.9rem;
}
.hero-float--1 { bottom: -20px; left: -40px; }
.hero-float--2 { top: -16px; right: -24px; }
.hf-icon   { font-size: 1.1rem; }
.hf-title  { font-size: 0.78rem; font-weight: 700; color: #fff; line-height: 1.2; }
.hf-sub    { font-family: 'DM Mono', monospace; font-size: 0.62rem; color: rgba(255,255,255,0.55); }

/* Scroll cue */
.hero__scroll {
  position: absolute; bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  text-decoration: none; opacity: 0.5;
  animation: scrollBounce 2.5s ease-in-out infinite;
}
.hs-text { font-family: 'DM Mono', monospace; font-size: 0.64rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.7); }
.hs-line  { width: 1px; height: 40px; background: linear-gradient(to bottom, rgba(201,168,76,0.7), transparent); }
@keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }

/* ── Section helpers ─────────────────────────────────────── */
.section-header { max-width: 700px; margin-bottom: 4rem; }
.section-sub    { margin-top: 1rem; max-width: 560px; }
.section-footer-cta { display: flex; justify-content: center; margin-top: 3rem; }
.section-alt { background: var(--cream); }

/* ── Services grid ───────────────────────────────────────── */
.services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.svc-card {
  padding: 2.25rem; display: flex; flex-direction: column; gap: 0.85rem;
  position: relative; overflow: hidden;
}
.svc-card__accent {
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--navy), var(--gold));
  opacity: 0; transition: opacity 0.3s;
}
.svc-card:hover .svc-card__accent { opacity: 1; }
.svc-card__icon {
  width: 54px; height: 54px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; border: 1px solid var(--border);
}
.svc-card__title { font-size: 1.1rem !important; color: var(--navy); margin: 0; }
.svc-card__desc  { flex: 1; }
.svc-card__link  {
  font-size: 0.85rem; font-weight: 700; color: var(--gold-dark);
  text-decoration: none; align-self: flex-start;
  transition: letter-spacing 0.2s; margin-top: 0.5rem;
}
.svc-card__link:hover { letter-spacing: 0.04em; }

/* ── Process ─────────────────────────────────────────────── */
.process-section { background: var(--navy); }
.process-section .section-header .eyebrow { color: var(--gold); }
.process-section .section-header h2 { color: #fff; }
.process-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem;
  position: relative;
}
.process-step { text-align: center; position: relative; }
.process-step__num {
  width: 56px; height: 56px; border-radius: 50%;
  border: 2px solid var(--gold);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 800;
  color: var(--gold); margin: 0 auto 1.25rem;
  background: rgba(201,168,76,0.08);
  position: relative; z-index: 1;
}
.process-step__connector {
  position: absolute; top: 28px; left: calc(50% + 28px); right: calc(-50% + 28px);
  height: 1px; background: rgba(201,168,76,0.25); z-index: 0;
}
.process-step__title { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
.process-step__desc  { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.65; }

/* ── Results strip ───────────────────────────────────────── */
.results-strip { background: var(--gold); padding: 3.5rem 1.5rem; }
.results-grid  { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
.result-item   { text-align: center; }
.result-item__num {
  font-family: 'Syne', sans-serif; font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800; color: var(--navy); margin-bottom: 0.3rem; line-height: 1;
}
.result-item__label { font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(27,58,92,0.7); }

/* ── Featured work ───────────────────────────────────────── */
.work-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.work-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  overflow: hidden; cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.25s;
  box-shadow: var(--shadow-sm);
}
.work-card:hover { transform: translateY(-7px); box-shadow: var(--shadow-xl); border-color: var(--gold-light); }
.work-card__thumb {
  height: 220px; position: relative;
  display: flex; flex-direction: column; justify-content: flex-end; padding: 1.25rem;
  overflow: hidden; transition: transform 0.35s;
}
.work-card:hover .work-card__thumb { transform: scale(1.02); }
.work-card__overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%); }
.work-card__cat  { font-family: 'DM Mono', monospace; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; position: relative; z-index: 1; margin-bottom: 0.35rem; }
.work-card__title { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 800; color: #fff; position: relative; z-index: 1; line-height: 1.25; }
.work-card__body  { padding: 1.4rem; display: flex; flex-direction: column; gap: 0.85rem; }
.work-card__desc  { flex: 1; }
.work-card__tags  { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.work-card__link  { font-size: 0.83rem; font-weight: 700; color: var(--gold-dark); align-self: flex-start; transition: letter-spacing 0.2s; }
.work-card:hover .work-card__link { letter-spacing: 0.04em; }

/* ── Testimonials ────────────────────────────────────────── */
.testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
.testi-card { padding: 2rem; }
.testi-card__stars { font-size: 0.9rem; letter-spacing: 0.06em; color: var(--gold); margin-bottom: 1rem; }
.testi-card__quote { font-style: italic; margin-bottom: 1.5rem; color: var(--muted); }
.testi-card__author { display: flex; align-items: center; gap: 0.75rem; }
.testi-card__av    { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 0.92rem; font-weight: 800; color: #fff; flex-shrink: 0; }
.testi-card__name  { font-size: 0.9rem; font-weight: 700; color: var(--navy); font-style: normal; display: block; }
.testi-card__role  { font-size: 0.75rem; color: var(--dim); margin-top: 0.15rem; }

/* ── CTA banner ──────────────────────────────────────────── */
.cta-banner {
  background: var(--navy);
  padding: 6rem 1.5rem;
}
.cta-banner__inner {
  display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center;
}
.cta-banner__h2 { font-style: normal; margin: 0.75rem 0 1rem; }
.cta-banner__actions { display: flex; flex-direction: column; gap: 0.85rem; flex-shrink: 0; }

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero__inner  { grid-template-columns: 1fr; gap: 3rem; padding-bottom: 4rem; }
  .hero__visual { display: none; }
  .process-grid { grid-template-columns: repeat(3,1fr); }
  .work-grid    { grid-template-columns: repeat(2,1fr); }
  .testi-grid   { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 768px) {
  .hero__ctas   { flex-direction: column; }
  .hero__stats  { gap: 1.5rem; }
  .process-grid { grid-template-columns: 1fr 1fr; }
  .results-grid { grid-template-columns: repeat(2,1fr); }
  .work-grid    { grid-template-columns: 1fr; }
  .testi-grid   { grid-template-columns: 1fr; }
  .cta-banner__inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .cta-banner__actions { flex-direction: row; flex-wrap: wrap; }
  .services-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .process-grid { grid-template-columns: 1fr; }
  .results-grid { grid-template-columns: 1fr 1fr; }
}
</style>
