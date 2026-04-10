<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container page-hero__inner">
        <div ref="heroText">
          <div class="eyebrow">Say Hello</div>
          <h1 class="heading-xl" style="color: #fff">
            Let's Start a<br /><em
              style="color: var(--gold); font-style: normal"
              >Conversation</em
            >
          </h1>
          <p
            class="body-lg"
            style="
              color: rgba(255, 255, 255, 0.72);
              max-width: 520px;
              margin-top: 1.25rem;
            "
          >
            Whether you have a project in mind, a question about our services,
            or just want to explore possibilities — we'd love to hear from you.
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
              <address class="contact-details" style="font-style: normal">
                <div
                  class="contact-detail"
                  v-for="c in contacts"
                  :key="c.label"
                >
                  <div class="contact-detail__icon" aria-hidden="true">
                    {{ c.icon }}
                  </div>
                  <div>
                    <div class="contact-detail__label">{{ c.label }}</div>
                    <a
                      v-if="c.href"
                      :href="c.href"
                      class="contact-detail__val contact-detail__val--link"
                      >{{ c.val }}</a
                    >
                    <span v-else class="contact-detail__val">{{ c.val }}</span>
                  </div>
                </div>
              </address>

              <div class="contact-divider vk-divider" />

              <div class="contact-socials">
                <div class="contact-socials__label">Follow Us</div>
                <nav
                  class="contact-socials__row"
                  aria-label="Social media links"
                >
                  <a
                    v-for="s in socials"
                    :key="s.label"
                    :href="s.href"
                    :aria-label="s.label"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn"
                    >{{ s.glyph }}</a
                  >
                </nav>
              </div>
            </div>

            <!-- Map placeholder -->
            <div class="vk-card map-card" aria-label="Office location map">
              <div class="map-placeholder">
                <div class="map-placeholder__pin" aria-hidden="true">📍</div>
                <div class="map-placeholder__location">Nairobi, Kenya</div>
                <a
                  href="https://maps.google.com/?q=Roysambu,Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="map-placeholder__link"
                  >Open in Google Maps →</a
                >
              </div>
            </div>

            <!-- Book consultation nudge -->
            <div class="book-nudge vk-card">
              <div class="book-nudge__icon" aria-hidden="true">📅</div>
              <div>
                <h3 class="book-nudge__title">Prefer a scheduled call?</h3>
                <p class="book-nudge__text">
                  Book a free 30-minute discovery session at a time that works
                  for you.
                </p>
                <RouterLink
                  to="/book"
                  class="btn-navy btn btn-sm"
                  style="margin-top: 0.85rem; display: inline-flex"
                  >Book Consultation →</RouterLink
                >
              </div>
            </div>
          </aside>

          <!-- Form column -->
          <div ref="formCol">
            <div class="vk-card form-card">
              <!-- Success State -->
              <Transition name="modal">
                <div
                  v-if="store.success"
                  class="success-state"
                  role="status"
                  aria-live="polite"
                >
                  <div class="success-state__icon" aria-hidden="true">✅</div>
                  <h2 class="success-state__title">Message Sent!</h2>
                  <p class="success-state__body">
                    Thank you for reaching out. We'll get back to you within 24
                    business hours.
                  </p>
                  <div class="success-state__actions">
                    <RouterLink to="/portfolio" class="btn-navy btn btn-sm"
                      >View Our Work →</RouterLink
                    >
                    <button
                      @click="handleNewMessage"
                      class="btn-outline-navy btn btn-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              </Transition>

              <!-- Form -->
              <form
                v-if="!store.success"
                @submit.prevent="handleSubmit"
                novalidate
                aria-label="Contact form"
              >
                <h2 class="form-card__title">Send Us a Message</h2>

                <!-- API Error Display -->
                <div v-if="store.error" class="api-error" role="alert">
                  <span class="error-icon" aria-hidden="true">⚠️</span>
                  {{ store.error }}
                </div>

                <div class="form-field">
                  <label class="vk-label" for="contact-name">
                    Full Name <span class="req" aria-label="required">*</span>
                  </label>
                  <input
                    id="contact-name"
                    v-model="store.form.name"
                    class="vk-input"
                    :class="{ err: store.errors.name }"
                    type="text"
                    placeholder="Your name"
                    autocomplete="name"
                    :disabled="store.loading"
                    :aria-describedby="
                      store.errors.name ? 'err-name' : undefined
                    "
                  />
                  <span
                    id="err-name"
                    class="field-err"
                    v-if="store.errors.name"
                    role="alert"
                  >
                    {{ store.errors.name }}
                  </span>
                </div>

                <div class="form-field">
                  <label class="vk-label" for="contact-email">
                    Email Address
                    <span class="req" aria-label="required">*</span>
                  </label>
                  <input
                    id="contact-email"
                    v-model="store.form.email"
                    class="vk-input"
                    :class="{ err: store.errors.email }"
                    type="email"
                    placeholder="your@email.com"
                    autocomplete="email"
                    :disabled="store.loading"
                    :aria-describedby="
                      store.errors.email ? 'err-email' : undefined
                    "
                  />
                  <span
                    id="err-email"
                    class="field-err"
                    v-if="store.errors.email"
                    role="alert"
                  >
                    {{ store.errors.email }}
                  </span>
                </div>

                <div class="form-field">
                  <label class="vk-label" for="contact-subject">
                    Subject <span class="opt">(optional)</span>
                  </label>
                  <input
                    id="contact-subject"
                    v-model="store.form.subject"
                    class="vk-input"
                    type="text"
                    placeholder="How can we help?"
                    :disabled="store.loading"
                  />
                </div>

                <div class="form-field">
                  <label class="vk-label" for="contact-message">
                    Message <span class="req" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    v-model="store.form.message"
                    class="vk-textarea"
                    :class="{ err: store.errors.message }"
                    placeholder="Tell us more about your enquiry…"
                    rows="6"
                    :disabled="store.loading"
                    :aria-describedby="
                      store.errors.message ? 'err-message' : undefined
                    "
                  />
                  <span
                    id="err-message"
                    class="field-err"
                    v-if="store.errors.message"
                    role="alert"
                  >
                    {{ store.errors.message }}
                  </span>
                  <div class="char-count" v-if="store.form.message.length > 0">
                    {{ store.form.message.length }}/10+ characters
                  </div>
                </div>

                <div class="form-footer">
                  <button
                    class="btn-navy btn"
                    type="submit"
                    :disabled="store.loading"
                    :aria-busy="store.loading"
                  >
                    <span
                      class="spinner"
                      v-if="store.loading"
                      aria-hidden="true"
                    ></span>
                    {{ store.loading ? "Sending…" : "Send Message →" }}
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
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useContactStore } from "@/stores/contact.js";
import { useGsap } from "@/composables/useGsap.js";
import { useSeo } from "@/composables/useSeo.js";

useSeo({
  title: "Contact Us | VividKode Creations",
  description:
    "Get in touch with VividKode Creations. We respond to every enquiry within 24 business hours.",
  canonical: "/contact",
});

const store = useContactStore();
const { heroSequence, slideIn } = useGsap();
const heroText = ref(null);
const infoCol = ref(null);
const formCol = ref(null);

const contacts = [
  {
    icon: "📧",
    label: "Email",
    val: "vividcode@gmail.com",
    href: "mailto:vividcode@gmail.com",
  },
  {
    icon: "📞",
    label: "Phone",
    val: "+254 705 171 490",
    href: "tel:+254705171490",
  },
  {
    icon: "📍",
    label: "Address",
    val: "Nairobi, Kenya",
    href: null,
  },
  {
    icon: "🕐",
    label: "Business Hours",
    val: "Mon–Fri, 8am–6pm EAT",
    href: null,
  },
];

const socials = [
  { label: "X (Twitter)", glyph: "𝕏", href: "https://twitter.com/vividkode" },
  {
    label: "LinkedIn",
    glyph: "in",
    href: "https://linkedin.com/company/vividkode",
  },
  { label: "Instagram", glyph: "ig", href: "https://instagram.com/vividkode" },
  { label: "Facebook", glyph: "f", href: "https://facebook.com/vividkode" },
];

async function handleSubmit() {
  const success = await store.submit();
  if (success) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleNewMessage() {
  store.reset();
}

onMounted(() => {
  heroSequence([heroText.value], {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
  });
  slideIn(infoCol.value, "left");
  slideIn(formCol.value, "right");
});
</script>

<style scoped>
/* Add these at the very beginning of the style section */
* {
  box-sizing: border-box;
}

/* Prevent horizontal scroll on all elements */
html, body {
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
}

/* Base styles */
.page-hero {
  background: linear-gradient(165deg, var(--navy-dark), var(--navy));
  padding: calc(var(--nav-h) + 4rem) 1.5rem 5rem;
  overflow-x: hidden;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  overflow-x: hidden;
}

.contact-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 2.5rem;
  align-items: start;
  width: 100%;
}

.contact-info-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0; /* Prevents flex overflow */
}

.contact-info-card {
  padding: 1.75rem;
  overflow-x: hidden;
  word-wrap: break-word;
}

/* Rest of your existing styles... */

/* ============================================
   RESPONSIVE STYLES - FIXED FOR NO HORIZONTAL SCROLL
   ============================================ */

/* Tablet Portrait */
@media (max-width: 960px) {
  .container {
    padding: 0 1rem;
  }
  
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-info-col {
    max-width: 100%;
    margin: 0 auto;
    width: 100%;
  }
  
  .page-hero {
    padding: calc(var(--nav-h) + 3rem) 1rem 4rem;
  }
  
  .page-hero__inner {
    padding: 0;
  }
  
  .page-hero h1 {
    font-size: 2.5rem;
    word-wrap: break-word;
  }
  
  .vk-card {
    width: 100%;
    overflow-x: hidden;
  }
}

/* Mobile Landscape */
@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .page-hero {
    padding: calc(var(--nav-h) + 2rem) 0.75rem 3rem;
  }
  
  .page-hero h1 {
    font-size: 2rem;
  }
  
  .page-hero .body-lg {
    font-size: 0.95rem;
  }
  
  .form-card {
    padding: 1.5rem;
  }
  
  .contact-info-card {
    padding: 1.25rem;
  }
  
  .contact-detail {
    gap: 0.75rem;
  }
  
  .contact-detail__icon {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  
  .contact-detail__val {
    font-size: 0.85rem;
    word-break: break-word;
  }
  
  .book-nudge {
    padding: 1rem 1.25rem;
  }
  
  .form-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .form-footer button {
    width: 100%;
    justify-content: center;
  }
  
  .form-note {
    text-align: center;
  }
  
  .success-state {
    padding: 2rem 1rem;
  }
  
  .success-state__title {
    font-size: 1.25rem;
  }
  
  /* Fix for any overflowing elements */
  .contact-details,
  .contact-socials__row,
  .form-field,
  .api-error {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  input, 
  textarea, 
  select {
    max-width: 100%;
    box-sizing: border-box;
  }
}

/* Mobile Portrait */
@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .page-hero {
    padding: calc(var(--nav-h) + 1.5rem) 0.5rem 2.5rem;
  }
  
  .page-hero h1 {
    font-size: 1.75rem;
  }
  
  .page-hero .eyebrow {
    font-size: 0.75rem;
  }
  
  .page-hero .body-lg {
    font-size: 0.85rem;
  }
  
  .contact-info-card__title,
  .form-card__title {
    font-size: 1rem;
  }
  
  .contact-detail {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
  
  .contact-detail__icon {
    margin: 0 auto;
  }
  
  .contact-detail__label {
    text-align: center;
  }
  
  .contact-detail__val {
    text-align: center;
    display: block;
  }
  
  .book-nudge {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
  .book-nudge__icon {
    margin-top: 0;
  }
  
  .contact-socials__row {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .map-placeholder {
    height: 160px;
  }
  
  .form-card {
    padding: 1.25rem;
  }
  
  form {
    gap: 1rem;
  }
  
  .form-field input,
  .form-field textarea {
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
  .api-error {
    font-size: 0.8rem;
    padding: 0.7rem;
    word-break: break-word;
  }
  
  .success-state__actions {
    flex-direction: column;
  }
  
  .success-state__actions .btn {
    width: 100%;
    justify-content: center;
  }
  
  /* Ensure all text wraps properly */
  p, h1, h2, h3, .contact-detail__val, .form-note {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}

/* Small Mobile */
@media (max-width: 380px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .page-hero h1 {
    font-size: 1.5rem;
  }
  
  .contact-info-card {
    padding: 1rem;
  }
  
  .contact-detail__val {
    font-size: 0.8rem;
    word-break: break-all;
  }
  
  .social-btn {
    width: 34px;
    height: 34px;
    font-size: 0.7rem;
  }
  
  .book-nudge__title {
    font-size: 0.85rem;
  }
  
  .book-nudge__text {
    font-size: 0.78rem;
  }
}

/* Touch-friendly adjustments */
@media (hover: none) and (pointer: coarse) {
  .social-btn,
  .contact-detail__val--link,
  .map-placeholder__link,
  .btn-navy,
  .btn-outline-navy {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-btn {
    min-height: 38px;
  }
  
  button,
  .btn {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
}

/* Landscape orientation for mobile */
@media (max-width: 768px) and (orientation: landscape) {
  .page-hero {
    padding: calc(var(--nav-h) + 1rem) 0.75rem 2rem;
  }
  
  .contact-layout {
    gap: 1.5rem;
  }
  
  .contact-info-col {
    max-width: 100%;
  }
  
  .map-placeholder {
    height: 140px;
  }
}

/* High-resolution screens */
@media (min-width: 1920px) {
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
}

/* Accessibility - Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .spinner,
  .social-btn,
  .contact-detail__val--link {
    transition: none;
    animation: none;
  }
}
</style>
