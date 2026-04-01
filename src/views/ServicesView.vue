<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container page-hero__inner">
        <div ref="heroText">
          <div class="eyebrow">What We Offer</div>
          <h1 class="heading-xl" style="color:#fff">
            Services Built for<br/>
            <em style="color:var(--gold);font-style:normal">Modern Business</em>
          </h1>
          <p class="body-lg" style="color:rgba(255,255,255,0.72);max-width:560px;margin-top:1.25rem">
            From pixel-perfect interfaces to production-grade AI pipelines — we cover the full stack of modern digital transformation.
          </p>
          <RouterLink to="/book" class="btn-gold btn btn-lg" style="margin-top:2rem">Book a Free Consultation →</RouterLink>
        </div>
      </div>
    </section>

    <!-- Services detail grid -->
    <section class="section section-lg">
      <div class="container">
        <div class="services-detail-grid" ref="servicesGrid">
          <article
            v-for="svc in services"
            :key="svc.title"
            class="svc-detail-card vk-card vk-card-hover"
          >
            <div class="svc-detail-card__top">
              <div class="svc-detail-card__icon" :style="{ background: svc.iconBg, borderColor: svc.iconBorder }">
                <span aria-hidden="true">{{ svc.icon }}</span>
              </div>
              <div class="svc-detail-card__cat vk-badge">{{ svc.category }}</div>
            </div>
            <h2 class="svc-detail-card__title">{{ svc.title }}</h2>
            <p class="body-md svc-detail-card__desc">{{ svc.desc }}</p>

            <div class="svc-detail-card__section-label">Use Cases</div>
            <ul class="svc-detail-card__use-cases" role="list">
              <li v-for="u in svc.useCases" :key="u">
                <span class="uc-dot" aria-hidden="true" />{{ u }}
              </li>
            </ul>

            <div class="svc-detail-card__tags">
              <span class="vk-badge" v-for="t in svc.tags" :key="t">{{ t }}</span>
            </div>

            <div class="svc-detail-card__accent" aria-hidden="true" />
            <RouterLink to="/book" class="svc-detail-card__cta" :aria-label="`Get started with ${svc.title}`">
              Get Started →
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Tech stack -->
    <section class="section section-alt" aria-labelledby="stack-heading">
      <div class="container">
        <div class="section-header" ref="stackHeader">
          <div class="eyebrow">Technology Stack</div>
          <h2 class="heading-lg" id="stack-heading">Tools &amp; Technologies</h2>
          <p class="body-lg section-sub">We work with the latest, most reliable technologies across the full development lifecycle.</p>
        </div>
        <div class="stack-grid" ref="stackGrid">
          <div class="stack-cat vk-card" v-for="cat in techCats" :key="cat.name">
            <div class="stack-cat__icon" aria-hidden="true">{{ cat.icon }}</div>
            <h3 class="stack-cat__name">{{ cat.name }}</h3>
            <div class="stack-cat__pills">
              <span class="vk-badge" v-for="t in cat.techs" :key="t">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why VividKode -->
    <section class="section why-section" aria-labelledby="why-heading">
      <div class="container">
        <div class="why-layout">
          <div ref="whyLeft">
            <div class="eyebrow" style="color:var(--gold)">Why Choose Us</div>
            <h2 class="heading-lg" id="why-heading" style="color:#fff">What Sets VividKode<br/>Apart</h2>
            <p class="body-md" style="color:rgba(255,255,255,0.65);margin-top:1rem;margin-bottom:2rem">We don't just deliver code — we deliver outcomes. Our integrated team thinks commercially as well as technically, ensuring every solution drives real business value.</p>
            <RouterLink to="/book" class="btn-gold btn">Book Free Consultation →</RouterLink>
          </div>
          <div class="why-points" ref="whyRight">
            <div class="why-point" v-for="w in whyPoints" :key="w.title">
              <div class="why-point__icon" aria-hidden="true">{{ w.icon }}</div>
              <div>
                <h3 class="why-point__title">{{ w.title }}</h3>
                <p class="why-point__desc">{{ w.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-strip">
      <div class="container cta-strip__inner">
        <h2 class="heading-lg" style="color:#fff">Not sure which service<br/><em style="color:var(--gold);font-style:normal">you need?</em></h2>
        <div style="display:flex;flex-direction:column;gap:0.85rem;flex-shrink:0">
          <RouterLink to="/book" class="btn-gold btn btn-lg">Book Free Consultation →</RouterLink>
          <RouterLink to="/contact" class="btn-outline-white btn">Talk to Our Team</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useGsap } from '@/composables/useGsap.js'
import { useSeo }  from '@/composables/useSeo.js'

useSeo({
  title: 'Our Services — Web, AI, Data & Custom Software',
  description: 'VividKode Creations offers website development, data science, AI solutions, data engineering, custom software, and API development for ambitious businesses.',
  canonical: '/services',
})

const { heroSequence, staggerReveal, scrollReveal, slideIn } = useGsap()
const heroText    = ref(null)
const servicesGrid = ref(null)
const stackHeader  = ref(null)
const stackGrid    = ref(null)
const whyLeft      = ref(null)
const whyRight     = ref(null)

const services = [
  {
    icon: '🌐', title: 'Website Development & Management', category: 'Web',
    iconBg: 'rgba(27,58,92,0.08)', iconBorder: 'rgba(27,58,92,0.15)',
    desc: 'From marketing sites to complex web applications — built with performance, accessibility, and conversion in mind.',
    useCases: ['SaaS product interfaces', 'E-commerce platforms', 'Corporate websites & landing pages', 'Progressive Web Apps (PWA)', 'CMS-powered content sites'],
    tags: ['Vue 3', 'React', 'Next.js', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: '📊', title: 'Data Science & Analytics', category: 'Data',
    iconBg: 'rgba(201,168,76,0.1)', iconBorder: 'rgba(201,168,76,0.2)',
    desc: 'Transform raw data into actionable intelligence — dashboards, predictive models, and analytical systems tailored to your business.',
    useCases: ['Sales & demand forecasting', 'Customer segmentation', 'Executive dashboards', 'Churn prediction models', 'Market basket analysis'],
    tags: ['Python', 'SQL', 'Tableau', 'Power BI', 'Pandas', 'scikit-learn'],
  },
  {
    icon: '🗄️', title: 'Data Modeling & Engineering', category: 'Data',
    iconBg: 'rgba(27,58,92,0.08)', iconBorder: 'rgba(27,58,92,0.15)',
    desc: 'Robust data pipelines and warehouses that scale with your organisation and ensure quality at every step.',
    useCases: ['Cloud data warehouse design', 'ETL/ELT pipeline builds', 'Real-time streaming systems', 'Data quality frameworks', 'Regulatory reporting automation'],
    tags: ['dbt', 'Apache Airflow', 'Apache Spark', 'Snowflake', 'BigQuery', 'Kafka'],
  },
  {
    icon: '🤖', title: 'AI Solutions & Machine Learning', category: 'AI',
    iconBg: 'rgba(201,168,76,0.1)', iconBorder: 'rgba(201,168,76,0.2)',
    desc: 'Production-grade AI systems — from computer vision and NLP to recommendation engines and custom LLM integrations.',
    useCases: ['LLM-powered chatbots & assistants', 'Image & document classification', 'Fraud detection systems', 'Recommendation engines', 'Predictive maintenance'],
    tags: ['PyTorch', 'TensorFlow', 'OpenAI', 'LangChain', 'HuggingFace', 'AWS SageMaker'],
  },
  {
    icon: '⚙️', title: 'Custom Software Development', category: 'Software',
    iconBg: 'rgba(27,58,92,0.08)', iconBorder: 'rgba(27,58,92,0.15)',
    desc: 'Bespoke software solutions designed around your workflows, built to scale, and delivered with comprehensive documentation.',
    useCases: ['Internal tools & portals', 'Business workflow automation', 'Legacy system modernisation', 'Enterprise SaaS platforms', 'Mobile & desktop applications'],
    tags: ['Microservices', 'GraphQL', 'REST', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    icon: '🔌', title: 'API Development & Integration', category: 'API',
    iconBg: 'rgba(201,168,76,0.1)', iconBorder: 'rgba(201,168,76,0.2)',
    desc: 'High-performance, secure APIs that connect your systems, power mobile apps, and enable third-party integrations at any scale.',
    useCases: ['Public REST & GraphQL APIs', 'Third-party integrations', 'Mobile app backends', 'Payment gateway integration', 'Webhook & event systems'],
    tags: ['FastAPI', 'Node.js', 'Express', 'gRPC', 'OAuth 2.0', 'OpenAPI'],
  },
]

const techCats = [
  { icon: '🎨', name: 'Frontend',        techs: ['Vue 3', 'React', 'Next.js', 'Nuxt', 'TypeScript', 'Tailwind CSS'] },
  { icon: '⚙️', name: 'Backend',         techs: ['Python', 'Node.js', 'FastAPI', 'Django', 'Go', 'Express'] },
  { icon: '🗄️', name: 'Databases',       techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake', 'BigQuery', 'MySQL'] },
  { icon: '🤖', name: 'AI / ML',         techs: ['PyTorch', 'TensorFlow', 'scikit-learn', 'HuggingFace', 'LangChain', 'OpenAI'] },
  { icon: '☁️', name: 'Cloud & DevOps',  techs: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
  { icon: '📊', name: 'Data Stack',      techs: ['Apache Spark', 'Airflow', 'dbt', 'Kafka', 'Tableau', 'Power BI'] },
]

const whyPoints = [
  { icon: '🎯', title: 'Outcome-First Thinking',  desc: 'We start with your business goals and work backwards to the right technical solution.' },
  { icon: '🔬', title: 'Full-Stack Expertise',    desc: 'One team covers frontend, backend, data, and AI — no coordination gaps between vendors.' },
  { icon: '📡', title: 'Africa-Native Insight',   desc: 'We understand local infrastructure, payment systems, and connectivity realities.' },
  { icon: '🔒', title: 'Security by Default',     desc: 'Security is engineered into every layer — not bolted on at the end.' },
]

onMounted(() => {
  heroSequence([heroText.value], { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 } })
  staggerReveal(servicesGrid.value ? [...servicesGrid.value.children] : [], { y: 50, stagger: 0.1 })
  scrollReveal(stackHeader.value)
  staggerReveal(stackGrid.value ? [...stackGrid.value.children] : [], { y: 40, stagger: 0.09 })
  slideIn(whyLeft.value, 'left')
  slideIn(whyRight.value, 'right')
})
</script>

<style scoped>
.page-hero { background: linear-gradient(165deg,var(--navy-dark),var(--navy)); padding: calc(var(--nav-h) + 4rem) 1.5rem 5rem; }
.section-header { max-width: 700px; margin-bottom: 3.5rem; }
.section-sub    { margin-top: 1rem; }

.services-detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }
.svc-detail-card {
  padding: 2.25rem; display: flex; flex-direction: column; gap: 1rem;
  position: relative; overflow: hidden;
}
.svc-detail-card__accent {
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--navy), var(--gold));
  opacity: 0; transition: opacity 0.3s;
}
.svc-detail-card:hover .svc-detail-card__accent { opacity: 1; }
.svc-detail-card__top { display: flex; align-items: center; justify-content: space-between; }
.svc-detail-card__icon {
  width: 56px; height: 56px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; border: 1px solid;
}
.svc-detail-card__cat  { }
.svc-detail-card__title {
  font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 700;
  color: var(--navy); line-height: 1.3;
}
.svc-detail-card__desc { flex: 1; }
.svc-detail-card__section-label {
  font-family: 'DM Mono', monospace; font-size: 0.65rem;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim);
}
.svc-detail-card__use-cases {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.35rem;
}
.svc-detail-card__use-cases li {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.85rem; color: var(--muted);
}
.uc-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--gold); flex-shrink: 0;
}
.svc-detail-card__tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.svc-detail-card__cta {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.85rem; font-weight: 700; color: var(--gold-dark);
  text-decoration: none; align-self: flex-start; margin-top: 0.25rem;
  transition: gap 0.2s, letter-spacing 0.2s;
}
.svc-detail-card__cta:hover { gap: 0.65rem; }

.stack-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.25rem; }
.stack-cat  { padding: 1.5rem; }
.stack-cat__icon { font-size: 1.4rem; margin-bottom: 0.6rem; }
.stack-cat__name { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 0.85rem; }
.stack-cat__pills { display: flex; flex-wrap: wrap; gap: 0.35rem; }

.why-section { background: var(--navy); }
.why-layout  { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
.why-points  { display: flex; flex-direction: column; gap: 1.75rem; }
.why-point   { display: flex; gap: 1rem; align-items: flex-start; }
.why-point__icon  { width: 44px; height: 44px; border-radius: 11px; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
.why-point__title { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem; }
.why-point__desc  { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.65; }

.cta-strip { background: var(--cream); padding: 5rem 1.5rem; border-top: 1px solid var(--border); }
.cta-strip__inner { display: flex; align-items: center; justify-content: space-between; gap: 3rem; flex-wrap: wrap; }
.cta-strip .heading-lg { color: var(--navy) !important; }
.cta-strip em { color: var(--gold-dark) !important; }

@media (max-width: 900px) {
  .why-layout  { grid-template-columns: 1fr; }
  .services-detail-grid { grid-template-columns: 1fr; }
}
</style>
