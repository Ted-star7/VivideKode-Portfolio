<template>
  <div class="home">
    <!-- ══ HERO ════════════════════════════════════════════════ -->
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero__bg">
        <div class="hero__grid" aria-hidden="true" />
        <div class="hero__orb hero__orb--1" aria-hidden="true" />
        <div class="hero__orb hero__orb--2" aria-hidden="true" />
        <div class="hero__float-vk" aria-hidden="true">
          <svg viewBox="0 0 120 100" fill="none" opacity="0.06">
            <path
              d="M4 8 L40 92 L56 52 L72 92 L108 8"
              stroke="#C9A84C"
              stroke-width="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div class="hero__inner container">
        <div class="hero__content">
          <div
            class="hero__eyebrow"
            ref="heroEyebrow"
            aria-label="Established Nairobi 2024"
          >
            <span class="eyebrow-bar" aria-hidden="true" />
            <span class="eyebrow">Est. Nairobi · 2026</span>
          </div>

          <h1 class="hero__h1" id="hero-heading" ref="heroTitle">
            Building <em class="hero__accent">Intelligent</em><br />
            Digital Solutions
          </h1>

          <p class="hero__sub body-lg" ref="heroSub">
            We craft world-class websites, AI systems, and data pipelines that
            help ambitious businesses across Africa scale faster and smarter.
          </p>

          <div class="hero__ctas" ref="heroCtas">
            <RouterLink to="/portfolio" class="btn-gold btn btn-lg"
              >View Our Work</RouterLink
            >
            <RouterLink to="/book" class="btn-outline-white btn btn-lg"
              >Book Free Consultation</RouterLink
            >
          </div>

          <div
            class="hero__stats"
            ref="heroStats"
            aria-label="Company statistics"
          >
            <div class="hero-stat" v-for="s in stats" :key="s.label">
              <div
                class="hero-stat__num"
                :ref="(el) => (statEls[s.label] = el)"
                :data-target="s.raw"
              >
                {{ s.num }}
              </div>
              <div class="hero-stat__label">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <div class="hero__visual" ref="heroVisual" aria-hidden="true">
          <div class="hero-card hero-card--main">
            <div class="hc-header">
              <div class="hc-dot" style="background: #ff6b6b" />
              <div class="hc-dot" style="background: #ffd166" />
              <div class="hc-dot" style="background: #4ade80" />
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
                <div
                  v-for="(h, i) in [65, 88, 52, 95, 72, 84]"
                  :key="i"
                  class="hc-bar"
                  :style="{ height: h + '%', animationDelay: i * 0.1 + 's' }"
                />
              </div>
            </div>
          </div>
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

      <a
        href="#services-section"
        class="hero__scroll"
        aria-label="Scroll down to services"
      >
        <span class="hs-text">Scroll to explore</span>
        <div class="hs-line" aria-hidden="true" />
      </a>
    </section>

    <!-- ══ SERVICES ════════════════════════════════════════════ -->
    <section
      class="section section-lg"
      id="services-section"
      aria-labelledby="services-heading"
    >
      <div class="container">
        <div class="section-header" ref="servicesHeader">
          <div class="eyebrow">What We Do</div>
          <h2 class="heading-lg" id="services-heading">
            End-to-End Technology<br />Expertise
          </h2>
          <p class="body-lg section-sub">
            Six specialisations. One integrated team. Zero compromise on
            quality.
          </p>
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
            <RouterLink
              to="/services"
              class="svc-card__link"
              :aria-label="`Learn more about ${svc.title}`"
            >
              Learn more <span aria-hidden="true">→</span>
            </RouterLink>
            <div class="svc-card__accent" aria-hidden="true" />
          </article>
        </div>

        <div class="section-footer-cta" ref="servicesCta">
          <RouterLink to="/services" class="btn-navy btn"
            >Explore All Services →</RouterLink
          >
        </div>
      </div>
    </section>

    <!-- ══ PRICING HIGHLIGHT ═══════════════════════════════════ -->
    <section
      class="section pricing-highlight"
      aria-labelledby="pricing-heading"
    >
      <div class="container">
        <div class="pricing-card vk-card" ref="pricingCard">
          <div class="pricing-icon" aria-hidden="true">💰</div>
          <h2 id="pricing-heading" class="pricing-title">
            Custom Pricing for Your Needs
          </h2>
          <p class="pricing-subtitle">
            Every project is unique. Get a tailored quote based on your specific
            requirements.
          </p>
          <div class="pricing-grid">
            <div class="pricing-item">
              <div class="pricing-item__icon">🌐</div>
              <div class="pricing-item__label">Website Development</div>
              <div class="pricing-item__desc">
                Custom designs, e-commerce, portals
              </div>
            </div>
            <div class="pricing-item">
              <div class="pricing-item__icon">⚙️</div>
              <div class="pricing-item__label">Custom Software</div>
              <div class="pricing-item__desc">
                ERP, CRM, business automation
              </div>
            </div>
            <div class="pricing-item">
              <div class="pricing-item__icon">🤖</div>
              <div class="pricing-item__label">AI/ML Solutions</div>
              <div class="pricing-item__desc">
                Predictive models, computer vision
              </div>
            </div>
            <div class="pricing-item">
              <div class="pricing-item__icon">📊</div>
              <div class="pricing-item__label">Data Engineering</div>
              <div class="pricing-item__desc">
                Pipelines, warehouses, analytics
              </div>
            </div>
          </div>
          <div class="pricing-actions">
            <RouterLink to="/book" class="btn-gold btn"
              >Book Consultation →</RouterLink
            >
            <RouterLink to="/contact" class="btn-outline-navy btn"
              >Contact Sales</RouterLink
            >
          </div>
          <p class="pricing-note">
            * Get a custom quote after our free discovery call
          </p>
        </div>
      </div>
    </section>

    <!-- ══ PROCESS ══════════════════════════════════════════════ -->
    <section class="section process-section" aria-labelledby="process-heading">
      <div class="container">
        <div class="section-header" ref="processHeader">
          <div class="eyebrow">How We Work</div>
          <h2 class="heading-lg" id="process-heading">
            A Process Built<br />for Results
          </h2>
        </div>
        <div class="process-grid" ref="processGrid">
          <div
            class="process-step"
            v-for="(step, i) in process"
            :key="step.num"
          >
            <div class="process-step__num">{{ step.num }}</div>
            <div
              class="process-step__connector"
              v-if="i < process.length - 1"
              aria-hidden="true"
            />
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
          <h2 class="heading-lg" id="work-heading">
            Projects That<br />Define Us
          </h2>
          <p class="body-lg section-sub">
            A selection of our most impactful engagements.
          </p>
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
            <div
              class="work-card__thumb"
              :style="{
                backgroundImage: p.imageUrl
                  ? `url(${p.imageUrl})`
                  : `linear-gradient(135deg, #1B3A5C 0%, #0d2d4a 100%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
            >
              <div class="work-card__overlay" />
              <span class="work-card__cat" :style="{ color: p.accent }">{{
                p.category
              }}</span>
              <h3 class="work-card__title">{{ p.title }}</h3>
            </div>
            <div class="work-card__body">
              <p class="work-card__desc body-sm">{{ p.desc }}</p>
              <div class="work-card__tags">
                <span
                  class="vk-badge"
                  v-for="t in p.tags.slice(0, 3)"
                  :key="t"
                  >{{ t }}</span
                >
              </div>
              <span class="work-card__link">View Case Study →</span>
            </div>
          </article>
        </div>
        <div class="section-footer-cta" ref="workCta">
          <RouterLink to="/portfolio" class="btn-outline-navy btn"
            >View All Projects →</RouterLink
          >
        </div>
      </div>
    </section>

    <!-- ══ TESTIMONIALS CAROUSEL ══════════════════════════════════ -->
    <section
      class="section testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div class="container">
        <div class="section-header" ref="testiHeader">
          <div class="eyebrow">Client Stories</div>
          <h2 class="heading-lg" id="testimonials-heading">
            What Our Clients Say
          </h2>
          <p class="body-lg section-sub">Feedback from our clients</p>
        </div>

        <!-- Loading State -->
        <div v-if="testimonialsLoading" class="testimonials-loading">
          <div class="loading-spinner"></div>
          <p>Loading client stories...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="testimonialsError" class="testimonials-error">
          <div class="error-icon" aria-hidden="true">⚠️</div>
          <p>{{ testimonialsError }}</p>
          <button
            @click="fetchTestimonials"
            class="btn-outline-navy btn btn-sm"
          >
            Try Again
          </button>
        </div>

        <!-- Testimonials Carousel -->
        <div v-else class="testimonials-carousel">
          <button
            class="carousel-nav-btn carousel-prev"
            @click="prevSlide"
            :disabled="currentIndex === 0"
            aria-label="Previous testimonials"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div class="carousel-container" ref="carouselContainer">
            <div class="carousel-track" :style="carouselTrackStyle">
              <div
                v-for="(t, idx) in testimonials"
                :key="t.id || idx"
                class="testi-card-wrapper"
                :style="testiWrapperStyle()"
              >
                <div class="testi-card">
                  <!-- Quote Icon -->
                  <div class="testi-card__quote-icon" aria-hidden="true">“</div>

                  <!-- Star Rating -->
                  <div
                    class="testi-card__stars"
                    :aria-label="`${t.rate} out of 5 stars`"
                  >
                    <span
                      v-for="i in 5"
                      :key="i"
                      class="star"
                      :class="{ 'star-filled': i <= t.rate }"
                      >★</span
                    >
                  </div>

                  <!-- Testimonial Text -->
                  <p class="testi-card__quote">"{{ t.text }}"</p>

                  <!-- Author Info -->
                  <div class="testi-card__author">
                    <div
                      class="testi-card__avatar"
                      :style="{ background: t.bg }"
                    >
                      {{ t.initials }}
                    </div>
                    <div class="testi-card__info">
                      <div class="testi-card__name">{{ t.name }}</div>
                      <div class="testi-card__rating">
                        <span class="rating-badge">{{ t.rate }}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="carousel-nav-btn carousel-next"
            @click="nextSlide"
            :disabled="currentIndex + slidesToShow >= testimonials.length"
            aria-label="Next testimonials"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- Carousel Dots -->
        <div
          class="carousel-dots"
          v-if="
            testimonials.length > slidesToShow &&
            !testimonialsLoading &&
            !testimonialsError
          "
        >
          <button
            v-for="(_, idx) in totalDots"
            :key="idx"
            class="carousel-dot"
            :class="{
              'carousel-dot-active': currentIndex === idx * slidesToShow,
            }"
            @click="goToSlide(idx * slidesToShow)"
            :aria-label="`Go to slide ${idx + 1}`"
          />
        </div>
      </div>
    </section>

    <!-- ══ CTA BANNER ════════════════════════════════════════════ -->
    <section class="cta-banner" ref="ctaBanner" aria-labelledby="cta-heading">
      <div class="cta-banner__inner container">
        <div class="cta-banner__text">
          <div class="eyebrow" style="color: var(--gold-light)">
            Ready to Start?
          </div>
          <h2
            class="cta-banner__h2 heading-lg"
            id="cta-heading"
            style="color: #fff"
          >
            Let's Build Something<br /><em style="color: var(--gold)"
              >Remarkable Together</em
            >
          </h2>
          <p
            style="
              color: rgba(255, 255, 255, 0.7);
              font-size: 1rem;
              line-height: 1.75;
            "
          >
            Tell us about your project. We respond within 24 hours and always
            offer a free first call.
          </p>
        </div>
        <div class="cta-banner__actions">
          <RouterLink to="/book" class="btn-gold btn btn-lg"
            >Book Free Consultation →</RouterLink
          >
          <RouterLink to="/contact" class="btn-outline-white btn btn-lg"
            >Get in Touch</RouterLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useGsap } from "@/composables/useGsap.js";
import { useSeo } from "@/composables/useSeo.js";
import { usePortfolioStore } from "@/stores/portfolio.js";
import { testimonialApi } from "@/services/api.service.js";

useSeo({
  title: "Intelligent Digital Solutions — Web, AI & Data",
  description:
    "VividKode Creations builds world-class websites, AI solutions, data pipelines, and custom software for ambitious businesses across Africa.",
  canonical: "/",
});

const router = useRouter();
const portfolio = usePortfolioStore();
const { gsap, heroSequence, staggerReveal, scrollReveal } = useGsap();

// Refs for GSAP targets
const heroEyebrow = ref(null);
const heroTitle = ref(null);
const heroSub = ref(null);
const heroCtas = ref(null);
const heroStats = ref(null);
const heroVisual = ref(null);
const servicesHeader = ref(null);
const servicesGrid = ref(null);
const servicesCta = ref(null);
const pricingCard = ref(null);
const processHeader = ref(null);
const processGrid = ref(null);
const resultsGrid = ref(null);
const workHeader = ref(null);
const workGrid = ref(null);
const workCta = ref(null);
const testiHeader = ref(null);
const ctaBanner = ref(null);
const carouselContainer = ref(null);
const statEls = reactive({});

// Testimonials state
const testimonials = ref([]);
const testimonialsLoading = ref(false);
const testimonialsError = ref(null);

// Carousel state
const currentIndex = ref(0);
const slidesToShow = ref(3);

// Hero stats — four distinct dimensions (avoid duplicate counts / duplicate “100%” metrics)
const stats = [
  { num: "30+", label: "Projects delivered", raw: 30 },
  { num: "5+", label: "Years expertise", raw: 5 },
  { num: "98%", label: "Client satisfaction", raw: 98 },
  { num: "12+", label: "Industries served", raw: 12 },
];

const services = [
  {
    icon: "🌐",
    title: "Website Development",
    desc: "Modern, performant websites and web applications that convert visitors into customers.",
    iconBg: "rgba(27,58,92,0.08)",
  },
  {
    icon: "📊",
    title: "Data Science & Analytics",
    desc: "Transform raw data into intelligence — dashboards, forecasts, and predictive models.",
    iconBg: "rgba(201,168,76,0.1)",
  },
  {
    icon: "🤖",
    title: "AI Solutions",
    desc: "Production ML — NLP, computer vision, LLM integrations, and recommendation engines.",
    iconBg: "rgba(27,58,92,0.08)",
  },
  {
    icon: "🗄️",
    title: "Data Engineering",
    desc: "Robust pipelines and data warehouses that scale and ensure quality at every step.",
    iconBg: "rgba(201,168,76,0.1)",
  },
  {
    icon: "⚙️",
    title: "Custom Software",
    desc: "Bespoke solutions built around your workflows — fully documented, fully supported.",
    iconBg: "rgba(27,58,92,0.08)",
  },
  {
    icon: "🔌",
    title: "API Development",
    desc: "High-performance, secure APIs that connect your systems and power your products.",
    iconBg: "rgba(201,168,76,0.1)",
  },
];

const process = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep-dive into your goals, constraints, and existing systems.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Architecture, tech stack, and project roadmap defined together.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Agile sprints with frequent demos and continuous feedback loops.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deployment, QA testing, and performance optimisation.",
  },
  {
    num: "05",
    title: "Support",
    desc: "Ongoing maintenance, monitoring, and iterative improvements.",
  },
];

const results = [
  { val: "<24h", label: "Median first response" },
  { val: "95%", label: "On-time delivery" },
  { val: "50+", label: "Technologies in production" },
];

const featuredProjects = computed(() => portfolio.projects.slice(0, 3));

// Carousel: track width & transform are % of the track so the strip does not overflow the viewport
const carouselTrackStyle = computed(() => {
  const n = Math.max(testimonials.value.length, 1);
  const s = slidesToShow.value;
  return {
    width: `${(n / s) * 100}%`,
    transform: `translateX(-${(currentIndex.value / n) * 100}%)`,
    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  };
});

function testiWrapperStyle() {
  const n = Math.max(testimonials.value.length, 1);
  return { flex: `0 0 calc(100% / ${n})` };
}

const totalDots = computed(() => {
  return Math.ceil(testimonials.value.length / slidesToShow.value);
});

// Update slidesToShow based on screen width
function updateSlidesToShow() {
  if (window.innerWidth < 768) {
    slidesToShow.value = 1;
  } else if (window.innerWidth < 1024) {
    slidesToShow.value = 2;
  } else {
    slidesToShow.value = 3;
  }

  // Adjust current index if needed
  if (currentIndex.value + slidesToShow.value > testimonials.value.length) {
    currentIndex.value = Math.max(
      0,
      testimonials.value.length - slidesToShow.value,
    );
  }
}

// Carousel navigation
function nextSlide() {
  if (currentIndex.value + slidesToShow.value < testimonials.value.length) {
    currentIndex.value += slidesToShow.value;
  }
}

function prevSlide() {
  if (currentIndex.value - slidesToShow.value >= 0) {
    currentIndex.value -= slidesToShow.value;
  } else {
    currentIndex.value = 0;
  }
}

function goToSlide(index) {
  currentIndex.value = index;
}

// Fetch testimonials from API
async function fetchTestimonials() {
  testimonialsLoading.value = true;
  testimonialsError.value = null;

  try {
    const response = await testimonialApi.getAll();
    const data = Array.isArray(response?.data?.data) ? response.data.data : [];

    if (data.length > 0) {
      testimonials.value = data.map((item) => {
        const name = item.name || "Anonymous Client";
        const initials = name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() || "")
          .join("");

        const rate = item.rate || 5;

        return {
          id: item.id,
          text: item.message || "No testimonial text provided.",
          name: name,
          rate: rate,
          initials: initials || "CL",
          bg:
            rate >= 4
              ? "linear-gradient(135deg, #1B3A5C, #234B78)"
              : "linear-gradient(135deg, #A8882E, #C9A84C)",
        };
      });
    } else {
      setDefaultTestimonials();
    }
  } catch (error) {
    console.error("[HomeView] testimonials fetch failed:", error);
    testimonialsError.value =
      "Unable to load client stories. Please try again later.";
    setDefaultTestimonials();
  } finally {
    testimonialsLoading.value = false;
  }
}

function setDefaultTestimonials() {
  testimonials.value = [
    {
      id: "1",
      text: "VividKode transformed our data infrastructure completely. What took our team days now runs in minutes. ROI was visible within the first month of deployment.",
      name: "Amara Osei",
      rate: 5,
      initials: "AO",
      bg: "linear-gradient(135deg, #1B3A5C, #234B78)",
    },
    {
      id: "2",
      text: "They built our entire e-commerce platform with a custom recommendation engine. Sales increased 40% in Q1 after launch. The quality and communication were outstanding.",
      name: "Priya Nair",
      rate: 5,
      initials: "PN",
      bg: "linear-gradient(135deg, #A8882E, #C9A84C)",
    },
    {
      id: "3",
      text: "Working with VividKode felt like having a world-class engineering team embedded in our organisation. On time, on budget, and genuinely invested in our success.",
      name: "David Kimani",
      rate: 5,
      initials: "DK",
      bg: "linear-gradient(135deg, #1B3A5C, #234B78)",
    },
    {
      id: "4",
      text: "The team at VividKode delivered beyond our expectations. Their technical expertise and attention to detail made all the difference in our digital transformation journey.",
      name: "Sarah Wanjiku",
      rate: 5,
      initials: "SW",
      bg: "linear-gradient(135deg, #A8882E, #C9A84C)",
    },
    {
      id: "5",
      text: "Excellent communication and technical execution. They understood our needs perfectly and delivered a solution that scaled with our business growth.",
      name: "Michael Otieno",
      rate: 5,
      initials: "MO",
      bg: "linear-gradient(135deg, #1B3A5C, #234B78)",
    },
    {
      id: "6",
      text: "The most reliable tech partner we have worked with. They consistently deliver high-quality solutions on time and within budget.",
      name: "Grace Muthoni",
      rate: 5,
      initials: "GM",
      bg: "linear-gradient(135deg, #A8882E, #C9A84C)",
    },
  ];
}

onMounted(async () => {
  await portfolio.fetchProjects();
  await fetchTestimonials();
  updateSlidesToShow();

  window.addEventListener("resize", updateSlidesToShow);

  // Hero animations
  heroSequence(
    [
      heroEyebrow.value,
      heroTitle.value,
      heroSub.value,
      heroCtas.value,
      heroStats.value,
    ],
    {
      from: { opacity: 0, y: 50 },
      to: {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        delay: 0.2,
      },
    },
  );

  gsap.fromTo(
    heroVisual.value,
    { opacity: 0, x: 60, scale: 0.92 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.5,
    },
  );

  gsap.to(".hero-float--1", {
    y: -12,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(".hero-float--2", {
    y: -8,
    duration: 2.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 0.8,
  });

  // Scroll animations
  scrollReveal(servicesHeader.value, { y: 40 });
  staggerReveal(servicesGrid.value ? [...servicesGrid.value.children] : [], {
    y: 50,
    stagger: 0.1,
  });
  scrollReveal(servicesCta.value);
  scrollReveal(pricingCard.value, { y: 40 });

  scrollReveal(processHeader.value, { y: 40 });
  staggerReveal(processGrid.value ? [...processGrid.value.children] : [], {
    y: 40,
    stagger: 0.12,
  });

  staggerReveal(resultsGrid.value ? [...resultsGrid.value.children] : [], {
    y: 30,
    stagger: 0.1,
  });

  scrollReveal(workHeader.value, { y: 40 });
  staggerReveal(workGrid.value ? [...workGrid.value.children] : [], {
    y: 50,
    stagger: 0.14,
  });
  scrollReveal(workCta.value);

  scrollReveal(testiHeader.value, { y: 40 });
  scrollReveal(ctaBanner.value, { y: 40, scale: 0.98 });

  gsap.fromTo(
    ".hc-bar",
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 1.2,
      transformOrigin: "bottom",
    },
  );
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSlidesToShow);
});
</script>

<style scoped>
/* Prevent horizontal scroll from carousels / full-bleed sections */
.home {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

/* ── Hero ─────────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  background: linear-gradient(
    165deg,
    var(--navy-dark) 0%,
    var(--navy) 45%,
    #1e4a7a 100%
  );
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0 1.5rem;
}
.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(201, 168, 76, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201, 168, 76, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
}
.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.hero__orb--1 {
  width: 500px;
  height: 500px;
  background: rgba(201, 168, 76, 0.1);
  top: -120px;
  right: 10%;
}
.hero__orb--2 {
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.04);
  bottom: -60px;
  left: 5%;
}
.hero__float-vk {
  position: absolute;
  bottom: 10%;
  right: 2%;
  width: 280px;
  height: 240px;
  pointer-events: none;
}
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding-top: var(--nav-h);
  min-height: 100vh;
  padding-bottom: 5rem;
  position: relative;
  z-index: 1;
}
.hero__content {
  max-width: 600px;
}
.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}
.eyebrow-bar {
  width: 28px;
  height: 2px;
  background: var(--gold);
  border-radius: 1px;
}
.hero__h1 {
  font-family: "Syne", sans-serif;
  font-size: clamp(2.6rem, 5.5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  color: #fff;
  margin-bottom: 1.5rem;
  font-style: normal;
}
.hero__accent {
  color: var(--gold);
  font-style: normal;
}
.hero__sub {
  color: rgba(255, 255, 255, 0.72);
  max-width: 520px;
  margin-bottom: 2.5rem;
}
.hero__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}
.hero__stats {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.hero-stat__num {
  font-family: "Syne", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 0.25rem;
}
.hero-stat__label {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.03em;
}
.hero__visual {
  position: relative;
}
.hero-card--main {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  backdrop-filter: blur(16px);
  overflow: hidden;
}
.hc-header {
  display: flex;
  gap: 6px;
  padding: 1rem 1.25rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.hc-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.hc-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.hc-line {
  height: 8px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
.hc-line--gold {
  background: rgba(201, 168, 76, 0.4);
}
.hc-spacer {
  height: 0.25rem;
}
.hc-row {
  display: flex;
  gap: 0.4rem;
}
.hc-badge {
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  padding: 0.25rem 0.6rem;
  border-radius: 5px;
  background: rgba(27, 58, 92, 0.6);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.hc-badge--outline {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.25);
}
.hc-badge--gold {
  background: rgba(201, 168, 76, 0.2);
  color: var(--gold-light);
  border-color: rgba(201, 168, 76, 0.35);
}
.hc-chart {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 60px;
  padding-top: 0.5rem;
}
.hc-bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  transform-origin: bottom;
  background: linear-gradient(
    to top,
    rgba(201, 168, 76, 0.8),
    rgba(201, 168, 76, 0.3)
  );
  animation: barGrow 0.8s ease forwards;
}
@keyframes barGrow {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
.hero-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  padding: 0.6rem 0.9rem;
}
.hero-float--1 {
  bottom: -20px;
  left: -40px;
}
.hero-float--2 {
  top: -16px;
  right: -24px;
}
.hf-icon {
  font-size: 1.1rem;
}
.hf-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.hf-sub {
  font-family: "DM Mono", monospace;
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.55);
}
.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  opacity: 0.5;
  animation: scrollBounce 2.5s ease-in-out infinite;
  z-index: 2;
}
.hs-text {
  font-family: "DM Mono", monospace;
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}
.hs-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(201, 168, 76, 0.7), transparent);
}
@keyframes scrollBounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(8px);
  }
}

/* ── Section Helpers ─────────────────────────────────────── */
.section {
  padding: 5rem 0;
}
.section-lg {
  padding: 6rem 0;
}
.section-alt {
  background: var(--cream);
}
.section-header {
  max-width: 700px;
  margin-bottom: 4rem;
}
.section-sub {
  margin-top: 1rem;
  max-width: 560px;
}
.section-footer-cta {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

/* ── Services Grid ───────────────────────────────────────── */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
.svc-card {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.svc-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}
.svc-card__accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--navy), var(--gold));
  opacity: 0;
  transition: opacity 0.3s;
}
.svc-card:hover .svc-card__accent {
  opacity: 1;
}
.svc-card__icon {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 1px solid var(--border);
}
.svc-card__title {
  font-size: 1.1rem !important;
  color: var(--navy);
  margin: 0;
}
.svc-card__desc {
  flex: 1;
  color: var(--muted);
  line-height: 1.6;
}
.svc-card__link {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--gold-dark);
  text-decoration: none;
  align-self: flex-start;
  transition: letter-spacing 0.2s;
  margin-top: 0.5rem;
}
.svc-card__link:hover {
  letter-spacing: 0.04em;
}

/* ── Pricing Highlight ───────────────────────────────────── */
.pricing-highlight {
  background: linear-gradient(
    135deg,
    rgba(27, 58, 92, 0.03),
    rgba(201, 168, 76, 0.05)
  );
}
.pricing-card {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--white);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}
.pricing-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.pricing-title {
  font-family: "Syne", sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 0.5rem;
}
.pricing-subtitle {
  color: var(--muted);
  margin-bottom: 2rem;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.pricing-item {
  padding: 1.5rem;
  background: rgba(27, 58, 92, 0.03);
  border-radius: 12px;
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.pricing-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}
.pricing-item__icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
.pricing-item__label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 0.5rem;
}
.pricing-item__desc {
  font-size: 0.85rem;
  color: var(--muted);
}
.pricing-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.pricing-note {
  font-size: 0.8rem;
  color: var(--dim);
  font-style: italic;
}

/* ── Process Section ─────────────────────────────────────── */
.process-section {
  background: var(--navy);
}
.process-section .section-header .eyebrow {
  color: var(--gold);
}
.process-section .section-header h2 {
  color: #fff;
}
.process-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  position: relative;
}
.process-step {
  text-align: center;
  position: relative;
}
.process-step__num {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Syne", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: var(--gold);
  margin: 0 auto 1.25rem;
  background: rgba(201, 168, 76, 0.08);
  position: relative;
  z-index: 1;
}
.process-step__connector {
  position: absolute;
  top: 28px;
  left: calc(50% + 28px);
  right: calc(-50% + 28px);
  height: 1px;
  background: rgba(201, 168, 76, 0.25);
  z-index: 0;
}
.process-step__title {
  font-family: "Syne", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}
.process-step__desc {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.65;
}

/* ── Results Strip ───────────────────────────────────────── */
.results-strip {
  background: var(--gold);
  padding: 3.5rem 1.5rem;
}
.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.result-item {
  text-align: center;
}
.result-item__num {
  font-family: "Syne", sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 0.3rem;
  line-height: 1;
}
.result-item__label {
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(27, 58, 92, 0.7);
}

/* ── Featured Work ───────────────────────────────────────── */
.work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.work-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    border-color 0.25s;
  box-shadow: var(--shadow-sm);
}
.work-card:hover {
  transform: translateY(-7px);
  box-shadow: var(--shadow-xl);
  border-color: var(--gold-light);
}
.work-card__thumb {
  height: 220px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.25rem;
  overflow: hidden;
  transition: transform 0.35s;
}
.work-card:hover .work-card__thumb {
  transform: scale(1.02);
}
.work-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
.work-card__cat {
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  margin-bottom: 0.35rem;
}
.work-card__title {
  font-family: "Syne", sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: #fff;
  position: relative;
  z-index: 1;
  line-height: 1.25;
}
.work-card__body {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.work-card__desc {
  flex: 1;
  color: var(--muted);
  line-height: 1.6;
}
.work-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.work-card__link {
  font-size: 0.83rem;
  font-weight: 700;
  color: var(--gold-dark);
  align-self: flex-start;
  transition: letter-spacing 0.2s;
}
.work-card:hover .work-card__link {
  letter-spacing: 0.04em;
}

/* ── Testimonials Carousel ───────────────────────────────── */
.testimonials-section {
  background: var(--cream);
  overflow: hidden;
}
.testimonials-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}
.carousel-container {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.carousel-track {
  display: flex;
  will-change: transform;
}
.testi-card-wrapper {
  box-sizing: border-box;
  min-width: 0;
  padding: 0 0.75rem;
}
.testi-card {
  background: var(--white);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--border);
}
.testi-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}
.testi-card__quote-icon {
  font-size: 4rem;
  font-family: "Georgia", serif;
  color: var(--gold);
  opacity: 0.3;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  line-height: 1;
}
.testi-card__stars {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
}
.star {
  font-size: 1.1rem;
  color: #e0e0e0;
  transition: color 0.2s;
}
.star-filled {
  color: var(--gold);
}
.testi-card__quote {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--body-text);
  margin-bottom: 1.5rem;
  flex: 1;
  position: relative;
  z-index: 1;
  font-style: italic;
  overflow-wrap: anywhere;
  word-break: break-word;
}
.testi-card__author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  position: relative;
  z-index: 1;
}
.testi-card__avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Syne", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
}
.testi-card__info {
  flex: 1;
}
.testi-card__name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 0.25rem;
}
.rating-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(201, 168, 76, 0.15);
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gold-dark);
}
.carousel-nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--white);
  color: var(--navy);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.carousel-nav-btn:hover:not(:disabled) {
  background: var(--navy);
  color: var(--white);
  border-color: var(--navy);
  transform: scale(1.05);
}
.carousel-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
}
.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-md);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}
.carousel-dot-active {
  width: 24px;
  background: var(--gold);
  border-radius: 4px;
}
.carousel-dot:hover:not(.carousel-dot-active) {
  background: var(--navy);
  transform: scale(1.2);
}

/* Testimonials Loading & Error */
.testimonials-loading,
.testimonials-error {
  text-align: center;
  padding: 4rem;
}
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border-md);
  border-top-color: var(--gold);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* ── CTA Banner ──────────────────────────────────────────── */
.cta-banner {
  background: var(--navy);
  padding: 6rem 1.5rem;
}
.cta-banner__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}
.cta-banner__h2 {
  font-style: normal;
  margin: 0.75rem 0 1rem;
}
.cta-banner__actions {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex-shrink: 0;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-bottom: 4rem;
  }
  .hero__visual {
    display: none;
  }
  .process-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .hero__ctas {
    flex-direction: column;
  }
  .hero__stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem 1rem;
    max-width: 22rem;
  }
  .process-grid {
    grid-template-columns: 1fr 1fr;
  }
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .work-grid {
    grid-template-columns: 1fr;
  }
  .cta-banner__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .cta-banner__actions {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .services-grid {
    grid-template-columns: 1fr;
  }
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  .pricing-actions {
    flex-direction: column;
    align-items: center;
  }
  .carousel-nav-btn {
    width: 40px;
    height: 40px;
  }
  .testimonials-carousel {
    gap: 0.5rem;
  }
  .testi-card {
    padding: 1.5rem;
  }
}
@media (max-width: 480px) {
  .process-grid {
    grid-template-columns: 1fr;
  }
  .hero__stats {
    grid-template-columns: 1fr 1fr;
    max-width: none;
  }
  .results-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .carousel-nav-btn {
    width: 36px;
    height: 36px;
  }
  .testi-card__quote-icon {
    font-size: 3rem;
  }
  .testi-card__stars {
    margin-bottom: 1rem;
  }
  .star {
    font-size: 0.9rem;
  }
}
</style>
