<template>
  <div>
    <!-- Loading State -->
    <div v-if="store.isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading project details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="store.error && !project" class="error-state">
      <div class="error-icon" aria-hidden="true">⚠️</div>
      <h2 class="heading-md">Unable to load project</h2>
      <p class="error-text">{{ store.error }}</p>
      <div class="error-actions">
        <button @click="retryLoad" class="btn-navy btn">Try Again</button>
        <RouterLink to="/portfolio" class="btn-outline-navy btn">
          ← Back to Portfolio
        </RouterLink>
      </div>
    </div>

    <!-- Project Content -->
    <template v-else-if="project">
      <!-- Full-bleed hero -->
      <section
        class="proj-hero"
        :style="project.imageUrl ? {
          backgroundImage: `url(${project.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {
          background: `linear-gradient(160deg, #1B3A5C 0%, #0d2d4a 100%)`,
        }"
      >
        <div class="proj-hero__overlay"></div>
        <div class="container proj-hero__inner">
          <RouterLink to="/portfolio" class="proj-hero__back"
            >← Back to Portfolio</RouterLink
          >
          <span class="proj-hero__cat" :style="{ color: project.accent }">{{
            project.category
          }}</span>
          <h1 class="proj-hero__title">{{ project.title }}</h1>
          <p class="proj-hero__client">{{ project.client }}</p>
        </div>
      </section>

      <!-- Content -->
      <section class="section">
        <div class="container proj-body">
          <!-- Left: main content -->
          <main class="proj-main">
            <div ref="mainContent">
              <h2 class="proj-section-title">Project Overview</h2>
              <p class="body-md">{{ project.fullDesc }}</p>

              <div class="proj-results-box">
                <h2 class="proj-section-title">
                  <span class="proj-results-icon" aria-hidden="true">📈</span> Key Details
                </h2>
                <ul class="proj-results-list" role="list">
                  <li
                    v-for="r in project.results"
                    :key="r"
                    class="proj-result-item"
                  >
                    <span class="result-dot" aria-hidden="true"></span>{{ r }}
                  </li>
                </ul>
              </div>

              <h2 class="proj-section-title" style="margin-top: 2.5rem">
                Technologies Used
              </h2>
              <div class="proj-tech-tags">
                <span class="vk-badge" v-for="t in project.tags" :key="t">{{
                  t
                }}</span>
              </div>
            </div>
          </main>

          <!-- Right: sidebar -->
          <aside class="proj-sidebar">
            <!-- Project info -->
            <div class="sidebar-card vk-card" ref="sidebarCard">
              <h3 class="sidebar-card__title">Project Details</h3>
              <dl class="sidebar-info">
                <div class="sidebar-info__row">
                  <dt class="sidebar-info__label">Client</dt>
                  <dd class="sidebar-info__val">{{ project.client }}</dd>
                </div>
                <div class="sidebar-info__row">
                  <dt class="sidebar-info__label">Category</dt>
                  <dd class="sidebar-info__val">{{ project.category }}</dd>
                </div>
                <div class="sidebar-info__row">
                  <dt class="sidebar-info__label">Status</dt>
                  <dd class="sidebar-info__val">{{ project.status || 'Completed' }}</dd>
                </div>
                <div class="sidebar-info__row">
                  <dt class="sidebar-info__label">Technologies</dt>
                  <dd class="sidebar-info__val">{{ project.tags.length }} tools</dd>
                </div>
              </dl>
            </div>

            <!-- CTA -->
            <div class="sidebar-cta vk-card" ref="sidebarCta">
              <h3 class="sidebar-cta__title">Interested in a similar project?</h3>
              <p class="body-sm" style="margin-bottom: 1.25rem">
                Let's discuss your goals. The first consultation is always free.
              </p>
              <RouterLink
                to="/book"
                class="btn-gold btn"
                style="width: 100%; justify-content: center"
                >Book Consultation →</RouterLink
              >
            </div>

            <!-- Other projects -->
            <div class="sidebar-card vk-card" ref="sidebarOther">
              <h3 class="sidebar-card__title">More Projects</h3>
              <div class="other-projects">
                <RouterLink
                  v-for="p in otherProjects"
                  :key="p.id"
                  :to="`/portfolio/${p.id}`"
                  class="other-proj"
                  :aria-label="`View ${p.title}`"
                >
                  <div
                    class="other-proj__thumb"
                    :style="p.imageUrl ? {
                      backgroundImage: `url(${p.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    } : {
                      background: '#1B3A5C',
                    }"
                  ></div>
                  <div class="other-proj__info">
                    <div class="other-proj__title">{{ p.title }}</div>
                    <div class="other-proj__cat" :style="{ color: p.accent }">
                      {{ p.category }}
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-strip">
        <div class="container cta-strip__inner">
          <h2 class="heading-lg" style="color: #fff">
            Ready to build<br /><em style="color: var(--gold); font-style: normal"
              >something like this?</em
            >
          </h2>
          <RouterLink to="/book" class="btn-gold btn btn-lg"
            >Book Free Consultation →</RouterLink
          >
        </div>
      </section>
    </template>

    <!-- Not found -->
    <div v-else-if="!store.isLoading && !project" class="not-found">
      <div class="not-found__icon" aria-hidden="true">◈</div>
      <h1 class="heading-lg">Project not found</h1>
      <p class="not-found__text">The project you're looking for doesn't exist or has been removed.</p>
      <RouterLink to="/portfolio" class="btn-navy btn" style="margin-top: 1.5rem">
        ← Back to Portfolio
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { usePortfolioStore } from "@/stores/portfolio.js";
import { useGsap } from "@/composables/useGsap.js";
import { useSeo } from "@/composables/useSeo.js";

const route = useRoute();
const store = usePortfolioStore();
const { scrollReveal, staggerReveal } = useGsap();

const project = computed(() => store.getById(route.params.id));

const otherProjects = computed(() =>
  store.projects.filter((p) => p.id !== route.params.id).slice(0, 3),
);

const mainContent = ref(null);
const sidebarCard = ref(null);
const sidebarCta = ref(null);
const sidebarOther = ref(null);

async function retryLoad() {
  await store.retryFetch();
}

watch(project, (newProject) => {
  if (newProject) {
    useSeo({
      title: `${newProject.title} — Case Study | VividKode Creations`,
      description: newProject.desc,
      canonical: `/portfolio/${newProject.id}`,
    });
  }
}, { immediate: true });

watch([() => store.isLoading, project], ([isLoading, proj]) => {
  if (!isLoading && proj && mainContent.value) {
    setTimeout(() => {
      scrollReveal(mainContent.value);
      staggerReveal(
        [sidebarCard.value, sidebarCta.value, sidebarOther.value].filter(Boolean),
        { y: 30, stagger: 0.14 },
      );
    }, 100);
  }
});

onMounted(async () => {
  if (!store.isLoaded && !store.isLoading) {
    await store.fetchProjects();
  }
});
</script>

<style scoped>
/* Hero */
.proj-hero {
  min-height: 420px;
  position: relative;
  display: flex;
  align-items: flex-end;
}
.proj-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
}
.proj-hero__inner {
  position: relative;
  z-index: 1;
  padding-top: calc(var(--nav-h) + 3rem);
  padding-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.proj-hero__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: color 0.18s;
  width: fit-content;
}
.proj-hero__back:hover {
  color: #fff;
}
.proj-hero__cat {
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.proj-hero__title {
  font-family: "Syne", sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.1;
  max-width: 750px;
}
.proj-hero__client {
  font-family: "DM Mono", monospace;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
}

/* Body */
.proj-body {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3.5rem;
  align-items: start;
}
.proj-section-title {
  font-family: "Syne", sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 1rem;
}
.proj-results-box {
  background: rgba(201, 168, 76, 0.06);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 14px;
  padding: 1.5rem;
  margin: 2rem 0;
}
.proj-results-icon {
  margin-right: 0.4rem;
}
.proj-results-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.75rem;
}
.proj-result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--body-text);
}
.result-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
  box-shadow: 0 0 8px var(--gold);
}
.proj-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

/* Sidebar */
.proj-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.sidebar-card {
  padding: 1.5rem;
}
.sidebar-card__title {
  font-family: "Syne", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 1.1rem;
}
.sidebar-info {
  display: flex;
  flex-direction: column;
}
.sidebar-info__row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--border);
}
.sidebar-info__row:last-child {
  border-bottom: none;
}
.sidebar-info__label {
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--dim);
}
.sidebar-info__val {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--navy);
  text-align: right;
}
.sidebar-cta {
  padding: 1.5rem;
  background: var(--navy);
  border-color: var(--navy);
}
.sidebar-cta__title {
  font-family: "Syne", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}
.sidebar-cta p {
  color: rgba(255, 255, 255, 0.65) !important;
}
.other-projects {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.other-proj {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.18s;
  margin: 0 -0.5rem;
}
.other-proj:last-child {
  border-bottom: none;
}
.other-proj:hover {
  background: var(--cream);
}
.other-proj__thumb {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  flex-shrink: 0;
  background-size: cover !important;
  background-position: center !important;
}
.other-proj__title {
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--navy);
  line-height: 1.3;
  margin-bottom: 0.15rem;
}
.other-proj__cat {
  font-family: "DM Mono", monospace;
  font-size: 0.65rem;
  font-weight: 600;
}

/* Loading State */
.loading-state {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  animation: spin 0.8s linear infinite;
}
.loading-text {
  color: var(--muted);
  font-size: 0.95rem;
}

/* Error State */
.error-state {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem;
  background: rgba(220, 53, 69, 0.05);
  border-radius: 16px;
  margin: 2rem;
}
.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.error-text {
  color: #dc3545;
  margin-bottom: 1.5rem;
  max-width: 500px;
}
.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Not Found */
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem;
}
.not-found__icon {
  font-size: 3rem;
  color: var(--dim);
  margin-bottom: 1rem;
}
.not-found__text {
  color: var(--muted);
  margin-top: 0.5rem;
  max-width: 400px;
}

/* CTA Strip */
.cta-strip {
  background: var(--navy);
  padding: 5rem 1.5rem;
}
.cta-strip__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .proj-body {
    grid-template-columns: 1fr;
  }
  .error-state {
    margin: 1rem;
  }
}
</style>