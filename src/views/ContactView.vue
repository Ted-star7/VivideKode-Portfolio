<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container page-hero__inner">
        <div ref="heroText">
          <div class="eyebrow">Say Hello</div>
          <h1 class="heading-xl" style="color:#fff">
            Let's Start a<br/><em style="color:var(--gold);font-style:normal">Conversation</em>
          </h1>
          <p class="body-lg" style="color:rgba(255,255,255,0.72);max-width:520px;margin-top:1.25rem">
            Whether you have a project in mind, a question about our services, or just want to explore possibilities — we'd love to hear from you.
          </p>
        </div>
      </div>
    </section>

    <section class="section section-lg">
      <div class="container">
        <div class="contact-layout">

          <!-- Info column -->
          <aside class="contact-info-col" ref="infoCol">
            <div class="vk-card contact-info-card">
              <h2 class="contact-info-card__title">Contact Information</h2>
              <address class="contact-details" style="font-style:normal">
                <div class="contact-detail" v-for="c in contacts" :key="c.label">
                  <div class="contact-detail__icon" aria-hidden="true">{{ c.icon }}</div>
                  <div>
                    <div class="contact-detail__label">{{ c.label }}</div>
                    <a v-if="c.href" :href="c.href" class="contact-detail__val contact-detail__val--link">{{ c.val }}</a>
                    <span v-else class="contact-detail__val">{{ c.val }}</span>
                  </div>
                </div>
              </address>

              <div class="contact-divider vk-divider" />

              <div class="contact-socials">
                <div class="contact-socials__label">Follow Us</div>
                <nav class="contact-socials__row" aria-label="Social media links">
                  <a
                    v-for="s in socials"
                    :key="s.label"
                    :href="s.href"
                    :aria-label="s.label"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn"
                  >{{ s.glyph }}</a>
                </nav>
              </div>
            </div>

            <!-- Map placeholder -->
            <div class="vk-card map-card" aria-label="Office location map">
              <div class="map-placeholder">
                <div class="map-placeholder__pin" aria-hidden="true">📍</div>
                <div class="map-placeholder__location">Westlands, Nairobi, Kenya</div>
                <a
                  href="https://maps.google.com/?q=Westlands,Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="map-placeholder__link"
                >Open in Google Maps →</a>
              </div>
            </div>

            <!-- Book consultation nudge -->
            <div class="book-nudge vk-card">
              <div class="book-nudge__icon" aria-hidden="true">📅</div>
              <div>
                <h3 class="book-nudge__title">Prefer a scheduled call?</h3>
                <p class="book-nudge__text">Book a free 30-minute discovery session at a time that works for you.</p>
                <RouterLink to="/book" class="btn-navy btn btn-sm" style="margin-top:0.85rem;display:inline-flex">Book Consultation →</RouterLink>
              </div>
            </div>
          </aside>

          <!-- Form column -->
          <div ref="formCol">
            <div class="vk-card form-card">
              <Transition name="modal">
                <div v-if="success" class="success-state" role="status" aria-live="polite">
                  <div class="success-state__icon" aria-hidden="true">✅</div>
                  <h2 class="success-state__title">Message Sent!</h2>
                  <p class="success-state__body">Thank you for reaching out. We'll get back to you within 24 business hours.</p>
                  <RouterLink to="/portfolio" class="btn-navy btn btn-sm" style="margin-top:1.5rem">View Our Work →</RouterLink>
                </div>
              </Transition>

              <form v-if="!success" @submit.prevent="handleSubmit" novalidate aria-label="Contact form">
                <h2 class="form-card__title">Send Us a Message</h2>

                <div class="form-field">
                  <label class="vk-label" for="contact-name">Full Name <span class="req" aria-label="required">*</span></label>
                  <input id="contact-name" v-model="form.name" class="vk-input" :class="{ err: errors.name }" type="text" placeholder="Your name" autocomplete="name" />
                  <span class="field-err" v-if="errors.name" role="alert">{{ errors.name }}</span>
                </div>

                <div class="form-field">
                  <label class="vk-label" for="contact-email">Email Address <span class="req" aria-label="required">*</span></label>
                  <input id="contact-email" v-model="form.email" class="vk-input" :class="{ err: errors.email }" type="email" placeholder="your@email.com" autocomplete="email" />
                  <span class="field-err" v-if="errors.email" role="alert">{{ errors.email }}</span>
                </div>

                <div class="form-field">
                  <label class="vk-label" for="contact-subject">Subject</label>
                  <input id="contact-subject" v-model="form.subject" class="vk-input" type="text" placeholder="How can we help?" />
                </div>

                <div class="form-field">
                  <label class="vk-label" for="contact-message">Message <span class="req" aria-label="required">*</span></label>
                  <textarea id="contact-message" v-model="form.message" class="vk-textarea" :class="{ err: errors.message }" placeholder="Tell us more about your enquiry…" rows="6" />
                  <span class="field-err" v-if="errors.message" role="alert">{{ errors.message }}</span>
                </div>

                <div class="form-footer">
                  <button class="btn-navy btn" type="submit" :disabled="submitting" :aria-busy="submitting">
                    <span class="spinner" v-if="submitting" aria-hidden="true" />
                    {{ submitting ? 'Sending…' : 'Send Message →' }}
                  </button>
                  <p class="form-note">We respond within 24 business hours.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useGsap } from '@/composables/useGsap.js'
import { useSeo }  from '@/composables/useSeo.js'

useSeo({
  title: 'Contact Us',
  description: 'Get in touch with VividKode Creations. We respond to every enquiry within 24 business hours.',
  canonical: '/contact',
})

const { heroSequence, slideIn } = useGsap()
const heroText = ref(null)
const infoCol  = ref(null)
const formCol  = ref(null)

const form       = reactive({ name: '', email: '', subject: '', message: '' })
const errors     = reactive({})
const submitting = ref(false)
const success    = ref(false)

const contacts = [
  { icon: '📧', label: 'Email',          val: 'hello@vividkode.dev',   href: 'mailto:hello@vividkode.dev' },
  { icon: '📞', label: 'Phone',          val: '+254 700 123 456',       href: 'tel:+254700123456' },
  { icon: '📍', label: 'Address',        val: 'Westlands, Nairobi, Kenya', href: null },
  { icon: '🕐', label: 'Business Hours', val: 'Mon–Fri, 8am–6pm EAT',  href: null },
]
const socials = [
  { label: 'X (Twitter)', glyph: '𝕏',  href: 'https://twitter.com/vividkode' },
  { label: 'LinkedIn',    glyph: 'in', href: 'https://linkedin.com/company/vividkode' },
  { label: 'GitHub',      glyph: 'gh', href: 'https://github.com/vividkode' },
]

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim())    errors.name    = 'Name is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address'
  if (!form.message.trim()) errors.message = 'Message is required'
  return !Object.keys(errors).length
}

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  try {
    // Real: await contactApi.send({ ...form })
    await new Promise(r => setTimeout(r, 1300))
    success.value = true
  } catch {
    errors.submit = 'Failed to send. Please email us directly at hello@vividkode.dev.'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  heroSequence([heroText.value], { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 } })
  slideIn(infoCol.value, 'left')
  slideIn(formCol.value, 'right')
})
</script>

<style scoped>
.page-hero { background: linear-gradient(165deg,var(--navy-dark),var(--navy)); padding: calc(var(--nav-h) + 4rem) 1.5rem 5rem; }
.contact-layout { display: grid; grid-template-columns: 360px 1fr; gap: 2.5rem; align-items: start; }
.contact-info-col { display: flex; flex-direction: column; gap: 1.25rem; }
.contact-info-card { padding: 1.75rem; }
.contact-info-card__title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 1.35rem; }
.contact-details { display: flex; flex-direction: column; gap: 1.1rem; }
.contact-detail  { display: flex; gap: 0.85rem; align-items: flex-start; }
.contact-detail__icon { width: 42px; height: 42px; border-radius: 10px; background: rgba(27,58,92,0.07); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.contact-detail__label { font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dim); margin-bottom: 0.18rem; }
.contact-detail__val   { font-size: 0.9rem; font-weight: 500; color: var(--body-text); }
.contact-detail__val--link { color: var(--navy); text-decoration: none; transition: color 0.18s; }
.contact-detail__val--link:hover { color: var(--gold-dark); }
.contact-divider { margin: 1.5rem 0; }
.contact-socials__label { font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); margin-bottom: 0.75rem; }
.contact-socials__row { display: flex; gap: 0.5rem; }
.social-btn {
  width: 38px; height: 38px; border-radius: 9px;
  background: rgba(27,58,92,0.06); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Mono', monospace; font-size: 0.78rem;
  color: var(--navy); text-decoration: none;
  transition: background 0.18s, border-color 0.18s, color 0.18s;
}
.social-btn:hover { background: var(--navy); color: #fff; border-color: var(--navy); }

.map-card { overflow: hidden; }
.map-placeholder {
  height: 180px; border-radius: 1.25rem;
  background: linear-gradient(135deg, rgba(27,58,92,0.06), rgba(201,168,76,0.08));
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 0.5rem; border: 1px dashed var(--border-md);
}
.map-placeholder__pin      { font-size: 2rem; }
.map-placeholder__location { font-size: 0.88rem; font-weight: 600; color: var(--navy); }
.map-placeholder__link     { font-size: 0.8rem; color: var(--gold-dark); text-decoration: none; font-weight: 600; transition: opacity 0.18s; }
.map-placeholder__link:hover { opacity: 0.75; }

.book-nudge { padding: 1.4rem 1.5rem; display: flex; gap: 0.85rem; align-items: flex-start; border-left: 3px solid var(--gold); }
.book-nudge__icon  { font-size: 1.3rem; flex-shrink: 0; margin-top: 0.1rem; }
.book-nudge__title { font-family: 'Syne', sans-serif; font-size: 0.92rem; font-weight: 700; color: var(--navy); margin-bottom: 0.3rem; }
.book-nudge__text  { font-size: 0.83rem; color: var(--muted); line-height: 1.6; }

.form-card { padding: 2.25rem; }
.form-card__title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 1.75rem; }
form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-field { display: flex; flex-direction: column; gap: 0.45rem; }
.req { color: #E53E3E; }
.field-err   { font-size: 0.76rem; color: #E53E3E; font-weight: 500; }
.form-footer { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border); }
.form-note   { font-size: 0.78rem; color: var(--dim); }

.success-state { text-align: center; padding: 3rem 1.5rem; }
.success-state__icon  { font-size: 3rem; margin-bottom: 1rem; }
.success-state__title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--navy); margin-bottom: 0.65rem; }
.success-state__body  { color: var(--muted); line-height: 1.75; max-width: 380px; margin: 0 auto; }

@media (max-width: 960px) { .contact-layout { grid-template-columns: 1fr; } }
</style>
