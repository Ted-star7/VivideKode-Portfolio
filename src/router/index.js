import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/PublicLayout.vue'),
    children: [
      { path: '',           name: 'home',      component: () => import('@/views/HomeView.vue'),          meta: { title: 'Home' } },
      { path: 'about',      name: 'about',     component: () => import('@/views/AboutView.vue'),         meta: { title: 'About Us' } },
      { path: 'services',   name: 'services',  component: () => import('@/views/ServicesView.vue'),      meta: { title: 'Our Services' } },
      { path: 'portfolio',  name: 'portfolio', component: () => import('@/views/PortfolioView.vue'),     meta: { title: 'Portfolio' } },
      { path: 'portfolio/:id', name: 'project', component: () => import('@/views/ProjectView.vue'),      meta: { title: 'Project' } },
      { path: 'book',       name: 'book',      component: () => import('@/views/BookView.vue'),          meta: { title: 'Book a Consultation' } },
      { path: 'contact',    name: 'contact',   component: () => import('@/views/ContactView.vue'),       meta: { title: 'Contact Us' } },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, _from, saved) => saved || { top: 0, behavior: 'smooth' }
})

export default router
