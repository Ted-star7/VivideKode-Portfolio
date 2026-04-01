<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container page-hero__inner">
        <div ref="heroText">
          <div class="eyebrow">Our Work</div>
          <h1 class="heading-xl" style="color:#fff">
            Projects That<br/><em style="color:var(--gold);font-style:normal">Define Us</em>
          </h1>
          <p class="body-lg" style="color:rgba(255,255,255,0.72);max-width:560px;margin-top:1.25rem">
            A curated selection of our most impactful client engagements — each representing our commitment to engineering excellence and measurable business outcomes.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter + Grid -->
    <section class="section section-lg">
      <div class="container">
        <!-- Filter pills -->
        <div class="filter-bar" ref="filterBar" role="group" aria-label="Filter projects by category">
          <button
            v-for="f in store.filters"
            :key="f"
            class="filter-pill"
            :class="{ active: store.filter === f }"
            @click="store.filter = f"
            :aria-pressed="store.filter === f"
          >{{ f }}</button>
        </div>

        <!-- Project grid -->
        <TransitionGroup name="proj-list" tag="div" class="proj-grid">
          <article
            v-for="p in store.filtered"
            :key="p.id"
            class="proj-card vk-card"
            @click="openProject(p)"
            tabindex="0"
            :aria-label="`View ${p.title} case study`"
            @keydown.enter="openProject(p)"
            role="button"
          >
            <div class="proj-card__thumb" :style="{ background: `linear-gradient(135deg, ${p.thumb} 0%, ${p.thumb}bb 100%)` }">
              <div class="proj-card__overlay" aria-hidden="true" />
              <div class="proj-card__meta">
                <span class="proj-card__cat" :style="{ color: p.accent, background: p.accent + '22', border: `1px solid ${p.accent}44` }">
                  {{ p.category }}
                </span>
                <span class="proj-card__year vk-badge" style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.15)">
                  {{ p.year }}
                </span>
              </div>
              <h2 class="proj-card__title">{{ p.title }}</h2>
            </div>
            <div class="proj-card__body">
              <p class="proj-card__client vk-badge">{{ p.client }}</p>
              <p class="proj-card__desc body-sm">{{ p.desc }}</p>
              <div class="proj-card__tags">
                <span class="vk-badge" v-for="t in p.tags.slice(0,3)" :key="t">{{ t }}</span>
                <span class="vk-badge" v-if="p.tags.length > 3">+{{ p.tags.length - 3 }}</span>
              </div>
              <div class="proj-card__footer">
                <span class="proj-card__cta">View Case Study →</span>
              </div>
            </div>
          </article>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-if="store.filtered.length === 0" class="empty-state" role="status">
          <div class="empty-state__icon" aria-hidden="true">◈</div>
          <p class="empty-state__text">No projects found in this category.</p>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <Transition name="modal">
      <div v-if="activeProject" class="modal-overlay" @click.self="activeProject = null" role="dialog" :aria-labelledby="`modal-title-${activeProject.id}`" aria-modal="true">
        <div class="modal-box modal-proj">
          <div class="modal-proj__thumb" :style="{ background: `linear-gradient(135deg, ${activeProject.thumb} 0%, ${activeProject.thumb}bb 100%)` }">
            <button class="modal-proj__close" @click="activeProject = null" aria-label="Close modal">✕</button>
            <div class="modal-proj__thumb-content">
              <span class="proj-card__cat" :style="{ color: activeProject.accent, background: activeProject.accent + '22', border: `1px solid ${activeProject.accent}44` }">
                {{ activeProject.category }}
              </span>
              <h2 class="modal-proj__title" :id="`modal-title-${activeProject.id}`">{{ activeProject.title }}</h2>
              <p class="modal-proj__client">{{ activeProject.client }} · {{ activeProject.year }}</p>
            </div>
          </div>
          <div class="modal-proj__body">
            <div class="modal-proj__overview">
              <h3 class="modal-proj__section-title">Project Overview</h3>
              <p class="body-md">{{ activeProject.fullDesc }}</p>
            </div>
            <div class="modal-proj__results">
              <h3 class="modal-proj__section-title">Key Results</h3>
              <ul class="results-list" role="list">
                <li v-for="r in activeProject.results" :key="r" class="result-item">
                  <span class="result-item__dot" aria-hidden="true" />
                  <span>{{ r }}</span>
                </li>
              </ul>
            </div>
            <div class="modal-proj__tech">
              <h3 class="modal-proj__section-title">Technologies Used</h3>
              <div class="modal-proj__tags">
                <span class="vk-badge" v-for="t in activeProject.tags" :key="t">{{ t }}</span>
              </div>
            </div>
            <div class="modal-proj__actions">
              <RouterLink to="/book" class="btn-navy btn" @click="activeProject = null">
                Start a Similar Project →
              </RouterLink>
              <button class="btn-outline-navy btn" @click="activeProject = null">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- CTA -->
    <section class="cta-strip">
      <div class="container cta-strip__inner">
        <h2 class="heading-lg" style="color:#fff">
          Ready to become<br/><em style="color:var(--gold);font-style:normal">our next success story?</em>
        </h2>
        <RouterLink to="/book" class="btn-gold btn btn-lg">Book Free Consultation →</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolio.js'
import { useGsap } from '@/composables/useGsap.js'
import { useSeo }  from '@/composables/useSeo.js'

useSeo({
  title: 'Portfolio — Client Projects & Case Studies',
  description: 'Explore VividKode Creations portfolio — web development, AI, data engineering, and custom software projects with real, measurable results.',
  canonical: '/portfolio',
})

const store         = usePortfolioStore()
const activeProject = ref(null)
const heroText      = ref(null)
const filterBar     = ref(null)

const { heroSequence, scrollReveal, staggerReveal } = useGsap()

function openProject(p) { activeProject.value = p }

onMounted(async () => {
  await store.fetchProjects()
  heroSequence([heroText.value], { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 } })
  scrollReveal(filterBar.value)
})
</script>

<style scoped>
.page-hero { background: linear-gradient(165deg,var(--navy-dark),var(--navy)); padding: calc(var(--nav-h) + 4rem) 1.5rem 5rem; }

.filter-bar {
  display: flex; gap: 0.5rem; flex-wrap: wrap;
  margin-bottom: 3rem;
}
.filter-pill {
  font-family: 'DM Mono', monospace; font-size: 0.75rem; font-weight: 500;
  padding: 0.45rem 1.1rem; border-radius: 9px;
  border: 1.5px solid var(--border-md);
  background: transparent; color: var(--muted);
  cursor: pointer; transition: all 0.22s;
  letter-spacing: 0.04em;
}
.filter-pill:hover { border-color: var(--navy); color: var(--navy); background: rgba(27,58,92,0.05); }
.filter-pill.active { background: var(--navy); color: #fff; border-color: var(--navy); box-shadow: var(--shadow-md); }

.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
  position: relative;
}

.proj-card {
  overflow: hidden; cursor: pointer; padding: 0;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s, border-color 0.25s;
}
.proj-card:hover { transform: translateY(-7px); box-shadow: var(--shadow-xl); border-color: var(--gold-light); }

.proj-card__thumb {
  height: 220px; position: relative;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 1.25rem; overflow: hidden;
  transition: transform 0.4s ease;
}
.proj-card:hover .proj-card__thumb { transform: scale(1.02); }
.proj-card__overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.72) 100%); }
.proj-card__meta { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; position: relative; z-index: 1; }
.proj-card__cat  { font-family: 'DM Mono', monospace; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.22rem 0.6rem; border-radius: 5px; }
.proj-card__year { font-family: 'DM Mono', monospace; font-size: 0.65rem; }
.proj-card__title {
  font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800;
  color: #fff; line-height: 1.25; position: relative; z-index: 1;
}
.proj-card__body   { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.proj-card__client { align-self: flex-start; }
.proj-card__desc   { color: var(--muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.proj-card__tags   { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.proj-card__footer { display: flex; align-items: center; justify-content: flex-end; padding-top: 0.25rem; border-top: 1px solid var(--border); }
.proj-card__cta    { font-size: 0.83rem; font-weight: 700; color: var(--gold-dark); transition: letter-spacing 0.2s; }
.proj-card:hover .proj-card__cta { letter-spacing: 0.04em; }

.empty-state { text-align: center; padding: 5rem; }
.empty-state__icon { font-size: 2.5rem; color: var(--dim); margin-bottom: 0.75rem; }
.empty-state__text { color: var(--muted); font-size: 0.95rem; }

/* Modal */
.modal-proj { max-width: 700px; }
.modal-proj__thumb {
  min-height: 260px; border-radius: 1.5rem 1.5rem 0 0;
  position: relative; display: flex; align-items: flex-end; padding: 2rem;
}
.modal-proj__close {
  position: absolute; top: 1.25rem; right: 1.25rem;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2);
  color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; transition: background 0.2s;
}
.modal-proj__close:hover { background: rgba(0,0,0,0.65); }
.modal-proj__thumb-content { position: relative; z-index: 1; }
.modal-proj__title  { font-family: 'Syne', sans-serif; font-size: 1.7rem; font-weight: 800; color: #fff; line-height: 1.15; margin: 0.5rem 0 0.25rem; }
.modal-proj__client { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.6); }
.modal-proj__body   { padding: 2rem; display: flex; flex-direction: column; gap: 1.75rem; }
.modal-proj__section-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 0.75rem; }
.results-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.18); border-radius: 12px; padding: 1.1rem 1.25rem; }
.result-item  { display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; color: var(--body-text); }
.result-item__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); flex-shrink: 0; box-shadow: 0 0 6px var(--gold); }
.modal-proj__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.modal-proj__actions { display: flex; gap: 0.85rem; flex-wrap: wrap; padding-top: 0.5rem; border-top: 1px solid var(--border); }

/* TransitionGroup */
.proj-list-move, .proj-list-enter-active, .proj-list-leave-active { transition: all 0.38s cubic-bezier(0.25,0.46,0.45,0.94); }
.proj-list-enter-from, .proj-list-leave-to { opacity: 0; transform: scale(0.94) translateY(12px); }
.proj-list-leave-active { position: absolute; }

.cta-strip { background: var(--navy); padding: 5rem 1.5rem; }
.cta-strip__inner { display: flex; align-items: center; justify-content: space-between; gap: 3rem; flex-wrap: wrap; }

@media (max-width: 768px) { .proj-grid { grid-template-columns: 1fr; } }
</style>
