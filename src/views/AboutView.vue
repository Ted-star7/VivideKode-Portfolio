<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container page-hero__inner">
        <div ref="heroText">
          <div class="eyebrow">Our Story</div>
          <h1 class="heading-xl" style="color:#fff">We're Builders<br/><em style="color:var(--gold);font-style:normal">at Heart</em></h1>
          <p class="body-lg" style="color:rgba(255,255,255,0.72);max-width:560px;margin-top:1.25rem">VividKode Creations was founded with a singular mission: to make world-class technology accessible to ambitious businesses everywhere — from startups to enterprises.</p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="section">
      <div class="container">
        <div class="story-layout">
          <div ref="storyLeft">
            <div class="eyebrow">Who We Are</div>
            <h2 class="heading-lg">Engineering Excellence,<br/>Delivered with Purpose</h2>
            <p class="body-md" style="margin-top:1.25rem;margin-bottom:1rem">We're a team of engineers, data scientists, and strategists who believe that great software is about more than just code — it's about transforming how organisations operate and compete.</p>
            <p class="body-md">From building their first product to modernising enterprise data infrastructure, every client receives the same rigour, creativity, and ownership we would apply to our own business.</p>
            <div class="stack-pills" style="margin-top:2rem">
              <span class="vk-badge" v-for="t in techStack" :key="t">{{ t }}</span>
            </div>
          </div>
          <div class="orbit-visual" ref="storyRight" aria-hidden="true">
            <div class="orbit-ring r1" /><div class="orbit-ring r2" /><div class="orbit-ring r3" />
            <div class="orbit-core">
              <svg viewBox="0 0 56 48" fill="none" width="44" height="38">
                <path d="M2 4 L20 44 L28 26 L36 44 L54 4" stroke="#1B3A5C" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M12 4 L20 24 L28 4" stroke="rgba(27,58,92,0.4)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
            <div v-for="n in nodes" :key="n.id" class="orbit-node" :style="{ top:n.top, left:n.left, background:n.color, boxShadow:`0 0 12px ${n.color}44` }" />
          </div>
        </div>
      </div>
    </section>

    <!-- MVV -->
    <section class="section section-alt">
      <div class="container">
        <div class="eyebrow">Our Foundation</div>
        <h2 class="heading-lg" style="margin-bottom:3rem">Mission, Vision &amp; Impact</h2>
        <div class="mvv-grid">
          <div class="mvv-card vk-card" v-for="item in mvv" :key="item.tag" ref="mvvCards">
            <div class="mvv-card__num">{{ item.num }}</div>
            <div class="eyebrow">{{ item.tag }}</div>
            <h3 class="heading-md" style="margin-bottom:0.75rem">{{ item.title }}</h3>
            <p class="body-md">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section">
      <div class="container">
        <div class="section-header" ref="valuesHeader">
          <div class="eyebrow">Core Values</div>
          <h2 class="heading-lg">What We Stand For</h2>
        </div>
        <div class="values-grid" ref="valuesGrid">
          <div class="value-card vk-card vk-card-hover" v-for="v in values" :key="v.title">
            <div class="value-card__icon">{{ v.icon }}</div>
            <h3 class="value-card__title">{{ v.title }}</h3>
            <p class="body-sm">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header" ref="teamHeader">
          <div class="eyebrow">The Team</div>
          <h2 class="heading-lg">Minds Behind the Work</h2>
        </div>
        <div class="team-grid" ref="teamGrid">
          <article class="team-card vk-card vk-card-hover" v-for="m in team" :key="m.name">
            <div class="team-card__av" :style="{ background: m.bg }">{{ m.initials }}</div>
            <h3 class="team-card__name">{{ m.name }}</h3>
            <div class="team-card__role">{{ m.role }}</div>
            <p class="body-sm">{{ m.bio }}</p>
            <div class="team-card__skills">
              <span class="vk-badge vk-badge-gold" v-for="s in m.skills" :key="s">{{ s }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-strip">
      <div class="container cta-strip__inner">
        <div>
          <h2 class="heading-lg" style="color:#fff">Ready to work<br/><em style="color:var(--gold);font-style:normal">with our team?</em></h2>
        </div>
        <RouterLink to="/book" class="btn-gold btn btn-lg">Book a Free Consultation →</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useGsap } from '@/composables/useGsap.js'
import { useSeo }  from '@/composables/useSeo.js'
import { visionMissionApi } from '@/services/api.service.js'

useSeo({ title:'About Us', description:'Learn about VividKode Creations — our story, mission, values, and the expert team behind every project.', canonical:'/about' })

const { heroSequence, staggerReveal, scrollReveal, slideIn } = useGsap()
const heroText   = ref(null)
const storyLeft  = ref(null)
const storyRight = ref(null)
const mvvCards   = ref([])
const valuesHeader = ref(null)
const valuesGrid   = ref(null)
const teamHeader   = ref(null)
const teamGrid     = ref(null)

const techStack = ['Vue 3','React','Next.js','Python','FastAPI','Node.js','PostgreSQL','MongoDB','Redis','Docker','Kubernetes','AWS','TensorFlow','PyTorch','Spark','dbt']
const nodes = [
  {id:1,top:'5%', left:'50%',color:'#1B3A5C'},
  {id:2,top:'22%',left:'90%',color:'#C9A84C'},
  {id:3,top:'78%',left:'90%',color:'#1B3A5C'},
  {id:4,top:'93%',left:'50%',color:'#C9A84C'},
  {id:5,top:'78%',left:'8%', color:'#1B3A5C'},
  {id:6,top:'22%',left:'8%', color:'#C9A84C'},
]
const mvv = ref([
  { num:'01', tag:'Mission', title:'Empowering Through Technology', text:'To deliver intelligent digital solutions that empower businesses to operate faster and more efficiently — bridging the gap between complex technology and real business value.' },
  { num:'02', tag:'Vision',  title:'A Data-Driven World',           text:'To be the most trusted technology partner for growth-stage companies in Africa and beyond, known for engineering excellence and long-term impact.' },
  { num:'03', tag:'Impact',  title:'Measurable Outcomes',           text:'We measure success by the outcomes we create for clients — not just deliverables. Every project starts with your goals and ends when those goals are genuinely met.' },
])
const values = [
  { icon:'🎯', title:'Excellence',   desc:'We hold ourselves to the highest technical and communication standards on every project, without exception.' },
  { icon:'🔍', title:'Transparency', desc:'You always know exactly where your project stands. No surprises, no hidden costs, no vague timelines.' },
  { icon:'🚀', title:'Innovation',   desc:'We actively explore new tools and approaches to deliver solutions ahead of the curve.' },
  { icon:'🤝', title:'Partnership',  desc:'We treat every client as a long-term partner, genuinely invested in your success beyond the project lifecycle.' },
  { icon:'📐', title:'Precision',    desc:'Every detail matters — from system architecture to pixel-perfect UI to thorough documentation.' },
  { icon:'⚡', title:'Velocity',    desc:'We move fast without sacrificing quality, using agile practices and intelligent automation.' },
  { icon:'🔒', title:'Security',    desc:'Security is never an afterthought. We engineer it into every layer of every system we build.' },
  { icon:'🌍', title:'Impact',      desc:'We build technology that creates measurable value for businesses and the people they ultimately serve.' },
]
// const team = [
//   { name:'Alex Mwangi',   initials:'AM', role:'Founder & Lead Engineer',  bio:'10+ years in full-stack and distributed systems architecture.', bg:'linear-gradient(135deg,#1B3A5C,#234B78)', skills:['Vue 3','Node.js','System Design'] },
//   { name:'Naomi Wanjiku', initials:'NW', role:'Head of Data Science',      bio:'ML & statistical modelling specialist. Previously at Google Brain.', bg:'linear-gradient(135deg,#A8882E,#C9A84C)', skills:['Python','TensorFlow','dbt'] },
//   { name:'James Otieno',  initials:'JO', role:'Senior AI Engineer',        bio:'Production ML systems, NLP, and LLM integrations at scale.', bg:'linear-gradient(135deg,#1B3A5C,#234B78)', skills:['PyTorch','LangChain','FastAPI'] },

// ]

const team = [
   {
    name: 'Baraka Rayson',
    initials: 'BR',
    role: 'Backend Engineer',
    bio: 'Focused on building reliable and scalable backend systems, APIs, and services that power modern applications.',
    bg: 'linear-gradient(135deg,#A8882E,#C9A84C)',
    skills: ['Springboot', 'API Development', 'Databases', 'System Architecture']
  },
  {
    name: 'Teddy Kibuthu',
    initials: 'TK',
    role: 'Data Scientist & Software Developer',
    bio: 'Specializing in data science, software development, and intelligent systems. Passionate about building scalable platforms and data-driven solutions.',
    bg: 'linear-gradient(135deg,#1B3A5C,#234B78)',
    skills: ['Python', 'Data Science', 'Machine Learning', 'Software Development']
  },
 
  {
    name: 'Mark Chira',
    initials: 'MC',
    role: 'Backend & Cloud Engineer',
    bio: 'Experienced in backend infrastructure and cloud deployments, ensuring systems are scalable, secure, and highly available.',
    bg: 'linear-gradient(135deg,#1B3A5C,#234B78)',
    skills: ['Cloud','Springboot', 'Docker', 'Kubernetes', 'Backend Engineering']
  },
  {
    name: 'Magrgaret Thiga',
    initials: 'MG',
    role: 'Software Developer ',
    bio: 'Specializes in Software Development, Graphical User Interface design, and deploying applications that drive business value.',
    bg: 'linear-gradient(135deg,#A8882E,#C9A84C)',
    skills: ['Node', 'TypeScript', 'JavaScript', 'Software Development']
  }
]

onMounted(async () => {
  try {
    const response = await visionMissionApi.getAll()
    const data = Array.isArray(response?.data?.data) ? response.data.data : []
    const first = data[0]
    if (first) {
      mvv.value = [
        {
          num: '01',
          tag: 'Mission',
          title: 'Empowering Through Technology',
          text: first.mission || mvv.value[0].text
        },
        {
          num: '02',
          tag: 'Vision',
          title: 'A Data-Driven World',
          text: first.vission || mvv.value[1].text
        },
        mvv.value[2]
      ]
    }
  } catch (error) {
    console.error('[AboutView] vision-mission fetch failed:', error)
  }

  heroSequence([heroText.value], { from:{ opacity:0, y:50 }, to:{ opacity:1, y:0, duration:1, ease:'power3.out', delay:0.2 } })
  slideIn(storyLeft.value, 'left')
  slideIn(storyRight.value, 'right')
  staggerReveal(mvvCards.value, { y:40, stagger:0.15 })
  scrollReveal(valuesHeader.value)
  staggerReveal(valuesGrid.value ? [...valuesGrid.value.children] : [], { y:40, stagger:0.08 })
  scrollReveal(teamHeader.value)
  staggerReveal(teamGrid.value ? [...teamGrid.value.children] : [], { y:50, stagger:0.1 })
})
</script>

<style scoped>
.page-hero { background: linear-gradient(165deg,var(--navy-dark),var(--navy)); padding: calc(var(--nav-h) + 4rem) 1.5rem 5rem; }
/* .page-hero__inner { } */
.story-layout { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center; }
.stack-pills  { display:flex; flex-wrap:wrap; gap:0.4rem; }
.orbit-visual { position:relative; aspect-ratio:1; max-width:420px; margin:auto; }
.orbit-ring   { position:absolute; inset:0; border-radius:50%; border:1px solid; opacity:0.14; animation:orb-spin linear infinite; }
.r1 { border-color:var(--navy); animation-duration:22s; }
.r2 { inset:11%; border-color:var(--gold); animation-duration:15s; animation-direction:reverse; }
.r3 { inset:22%; border-color:var(--navy); animation-duration:9s; }
@keyframes orb-spin { to { transform:rotate(360deg); } }
.orbit-core { position:absolute; inset:28%; background:linear-gradient(135deg,rgba(27,58,92,0.08),rgba(201,168,76,0.1)); border-radius:50%; display:flex; align-items:center; justify-content:center; border:1px solid var(--border); }
.orbit-node { position:absolute; width:10px; height:10px; border-radius:50%; transform:translate(-50%,-50%); }
.mvv-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
.mvv-card { padding:2rem; position:relative; overflow:hidden; }
.mvv-card__num { font-family:'Syne',sans-serif; font-size:3.5rem; font-weight:800; color:var(--border); position:absolute; top:1rem; right:1.5rem; line-height:1; }
.values-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1.25rem; margin-top:2.5rem; }
.value-card { padding:1.75rem; }
.value-card__icon { font-size:1.8rem; margin-bottom:0.85rem; }
.value-card__title { font-family:'Syne',sans-serif; font-size:1rem; font-weight:700; color:var(--navy); margin-bottom:0.5rem; }
.team-grid  { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1.5rem; margin-top:2.5rem; }
.team-card  { padding:2rem; text-align:center; }
.team-card__av   { width:72px; height:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:800; color:#fff; margin:0 auto 1.1rem; }
.team-card__name { font-family:'Syne',sans-serif; font-size:1rem; font-weight:700; color:var(--navy); margin-bottom:0.3rem; }
.team-card__role { font-family:'DM Mono',monospace; font-size:0.7rem; color:var(--gold-dark); margin-bottom:0.75rem; letter-spacing:0.04em; }
.team-card__skills { display:flex; flex-wrap:wrap; gap:0.35rem; justify-content:center; margin-top:0.85rem; }
.cta-strip { background:var(--navy); padding:5rem 1.5rem; }
.cta-strip__inner { display:flex; align-items:center; justify-content:space-between; gap:3rem; flex-wrap:wrap; }
@media(max-width:900px){ .story-layout{grid-template-columns:1fr} .orbit-visual{display:none} .mvv-grid{grid-template-columns:1fr} }
</style>
