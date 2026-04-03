<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container page-hero__inner">
        <div ref="heroText">
          <div class="eyebrow">Get Started</div>
          <h1 class="heading-xl" style="color: #fff">
            Book a Free<br /><em style="color: var(--gold); font-style: normal"
              >Consultation</em
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
            Tell us about your project. We'll set up a discovery call to explore
            the best approach — no commitment required.
          </p>
        </div>
      </div>
    </section>

    <section class="section section-lg">
      <div class="container">
        <div class="book-layout">
          <!-- Left: Info -->
          <aside class="book-info" ref="bookInfo">
            <!-- Steps -->
            <div class="info-card vk-card">
              <h2 class="info-card__title">What to Expect</h2>
              <ol class="steps-list" role="list">
                <li class="step-item" v-for="(s, i) in steps" :key="i">
                  <div class="step-item__num" aria-hidden="true">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <h3 class="step-item__title">{{ s.title }}</h3>
                    <p class="step-item__desc">{{ s.desc }}</p>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Contact -->
            <div class="info-card vk-card">
              <h2 class="info-card__title">Prefer to reach out directly?</h2>
              <address class="contact-list" style="font-style: normal">
                <div class="contact-row" v-for="c in contacts" :key="c.label">
                  <div class="contact-row__icon" aria-hidden="true">
                    {{ c.icon }}
                  </div>
                  <div>
                    <div class="contact-row__label">{{ c.label }}</div>
                    <a
                      v-if="c.href"
                      :href="c.href"
                      class="contact-row__val contact-row__val--link"
                      >{{ c.val }}</a
                    >
                    <span v-else class="contact-row__val">{{ c.val }}</span>
                  </div>
                </div>
              </address>
            </div>

            <!-- Guarantee -->
            <div class="guarantee-box">
              <div class="guarantee-box__icon" aria-hidden="true">🔒</div>
              <div>
                <div class="guarantee-box__title">Our Promise</div>
                <p class="guarantee-box__text">
                  100% free. No obligation. We respond to every enquiry within
                  24 business hours.
                </p>
              </div>
            </div>
          </aside>

          <!-- Right: Form -->
          <div ref="bookForm">
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
                  <h2 class="success-state__title">Consultation Booked!</h2>
                  <p class="success-state__body">
                    We've received your request and will be in touch within 24
                    business hours to confirm your session.
                  </p>
                  <div class="success-state__actions">
                    <RouterLink
                      to="/"
                      class="btn-navy btn btn-sm"
                      @click="store.reset()"
                      >Back to Home</RouterLink
                    >
                    <RouterLink
                      to="/portfolio"
                      class="btn-outline-navy btn btn-sm"
                      @click="store.reset()"
                      >View Our Work</RouterLink
                    >
                  </div>
                </div>
              </Transition>

              <!-- Form -->
              <form
                v-if="!store.success"
                @submit.prevent="handleSubmit"
                novalidate
                aria-label="Consultation booking form"
              >
                <h2 class="form-card__title">Fill in your details</h2>

                <div class="form-row">
                  <div class="form-field">
                    <label class="vk-label" for="book-name"
                      >Full Name
                      <span class="req" aria-label="required">*</span></label
                    >
                    <input
                      id="book-name"
                      v-model="store.form.name"
                      class="vk-input"
                      :class="{ err: store.errors.name }"
                      type="text"
                      placeholder="Jane Doe"
                      autocomplete="name"
                      :aria-describedby="
                        store.errors.name ? 'err-name' : undefined
                      "
                      :disabled="store.loading"
                    />
                    <span
                      id="err-name"
                      class="field-err"
                      v-if="store.errors.name"
                      role="alert"
                      >{{ store.errors.name }}</span
                    >
                  </div>
                  <div class="form-field">
                    <label class="vk-label" for="book-email"
                      >Email Address
                      <span class="req" aria-label="required">*</span></label
                    >
                    <input
                      id="book-email"
                      v-model="store.form.email"
                      class="vk-input"
                      :class="{ err: store.errors.email }"
                      type="email"
                      placeholder="jane@company.com"
                      autocomplete="email"
                      :aria-describedby="
                        store.errors.email ? 'err-email' : undefined
                      "
                      :disabled="store.loading"
                    />
                    <span
                      id="err-email"
                      class="field-err"
                      v-if="store.errors.email"
                      role="alert"
                      >{{ store.errors.email }}</span
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-field">
                    <label class="vk-label" for="book-company"
                      >Company <span class="opt">(optional)</span></label
                    >
                    <input
                      id="book-company"
                      v-model="store.form.company"
                      class="vk-input"
                      type="text"
                      placeholder="Acme Inc."
                      autocomplete="organization"
                      :disabled="store.loading"
                    />
                  </div>
                  <div class="form-field">
                    <label class="vk-label" for="book-service"
                      >Service Interested In
                      <span class="req" aria-label="required">*</span></label
                    >
                    <select
                      id="book-service"
                      v-model="store.form.service"
                      class="vk-select"
                      :class="{ err: store.errors.service }"
                      :aria-describedby="
                        store.errors.service ? 'err-service' : undefined
                      "
                      :disabled="store.loading"
                    >
                      <option value="">Select a service…</option>
                      <option v-for="s in serviceOptions" :key="s" :value="s">
                        {{ s }}
                      </option>
                    </select>
                    <span
                      id="err-service"
                      class="field-err"
                      v-if="store.errors.service"
                      role="alert"
                      >{{ store.errors.service }}</span
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-field">
                    <label class="vk-label" for="book-date"
                      >Preferred Date <span class="opt">(optional)</span></label
                    >
                    <input
                      id="book-date"
                      v-model="store.form.date"
                      class="vk-input"
                      type="date"
                      :min="minDate"
                      :disabled="store.loading"
                    />
                  </div>
                  <div class="form-field">
                    <label class="vk-label" for="book-time"
                      >Preferred Time (EAT)
                      <span class="opt">(optional)</span></label
                    >
                    <select
                      id="book-time"
                      v-model="store.form.time"
                      class="vk-select"
                      :disabled="store.loading"
                    >
                      <option value="">Select time slot…</option>
                      <option v-for="t in timeSlots" :key="t" :value="t">
                        {{ t }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-field">
                  <label class="vk-label" for="book-message"
                    >Tell Us About Your Project
                    <span class="req" aria-label="required">*</span></label
                  >
                  <textarea
                    id="book-message"
                    v-model="store.form.message"
                    class="vk-textarea"
                    :class="{ err: store.errors.message }"
                    placeholder="Describe your project, goals, timeline, and any relevant context…"
                    rows="5"
                    :aria-describedby="
                      store.errors.message ? 'err-message' : undefined
                    "
                    :disabled="store.loading"
                  />
                  <span
                    id="err-message"
                    class="field-err"
                    v-if="store.errors.message"
                    role="alert"
                    >{{ store.errors.message }}</span
                  >
                  <div class="char-count" v-if="store.form.message.length > 0">
                    {{ store.form.message.length }}/20+ characters
                  </div>
                </div>

                <div v-if="store.error" class="api-error" role="alert">
                  <span class="error-icon" aria-hidden="true">⚠️</span>
                  {{ store.error }}
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
                    {{ store.loading ? "Submitting…" : "Book Consultation →" }}
                  </button>
                  <p class="form-note">
                    We respond within 24 hours. No commitment required.
                  </p>
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
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { useBookingStore } from "@/stores/booking.js";
import { useGsap } from "@/composables/useGsap.js";
import { useSeo } from "@/composables/useSeo.js";

useSeo({
  title: "Book a Free Consultation | VividKode Creations",
  description:
    "Book a free discovery call with VividKode Creations. Tell us about your project and we'll get back within 24 hours.",
  canonical: "/book",
});

const store = useBookingStore();
const { heroSequence, slideIn } = useGsap();
const heroText = ref(null);
const bookInfo = ref(null);
const bookForm = ref(null);

// Minimum date for date picker (today)
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

const serviceOptions = [
  "Website Development",
  "Data Science & Analytics",
  "Data Modeling & Engineering",
  "AI / Machine Learning",
  "Custom Software Development",
  "API Development",
  "System Design & Architecture",
  "Other / Multiple Services",
];

const timeSlots = [
  "08:00 – 09:00 EAT",
  "09:00 – 10:00 EAT",
  "10:00 – 11:00 EAT",
  "11:00 – 12:00 EAT",
  "12:00 – 13:00 EAT",
  "13:00 – 14:00 EAT",
  "14:00 – 15:00 EAT",
  "15:00 – 16:00 EAT",
  "16:00 – 17:00 EAT",
  "17:00 – 18:00 EAT",
];
const steps = [
  {
    title: "Submit Your Request",
    desc: "Fill in the form with your project details and goals.",
  },
  {
    title: "We Review & Confirm",
    desc: "Our team reviews within 24 hours and confirms your session.",
  },
  {
    title: "30-min Discovery Call",
    desc: "We discuss requirements, timeline, and technical approach.",
  },
  {
    title: "Receive a Proposal",
    desc: "Detailed scope, timeline, and pricing within 48 hours.",
  },
];

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
    icon: "🕐",
    label: "Business Hours",
    val: "Mon–Fri, 8am–6pm EAT",
    href: null,
  },
];

async function handleSubmit() {
  const success = await store.submit();
  if (success) {
    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

onMounted(() => {
  heroSequence([heroText.value], {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
  });
  slideIn(bookInfo.value, "left");
  slideIn(bookForm.value, "right");
});
</script>

<style scoped>
.page-hero {
  background: linear-gradient(165deg, var(--navy-dark), var(--navy));
  padding: calc(var(--nav-h) + 4rem) 1.5rem 5rem;
}

.book-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 2.5rem;
  align-items: start;
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-card {
  padding: 1.75rem;
}

.info-card__title {
  font-family: "Syne", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 1.25rem;
}

.steps-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.step-item {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
}

.step-item__num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--navy);
  color: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-item__title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 0.18rem;
}

.step-item__desc {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.55;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.contact-row {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.contact-row__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(27, 58, 92, 0.07);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.contact-row__label {
  font-family: "DM Mono", monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 0.18rem;
}

.contact-row__val {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--body-text);
}

.contact-row__val--link {
  color: var(--navy);
  text-decoration: none;
  transition: color 0.18s;
}

.contact-row__val--link:hover {
  color: var(--gold-dark);
}

.guarantee-box {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 1.25rem 1.4rem;
  border-radius: 14px;
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid rgba(201, 168, 76, 0.22);
}

.guarantee-box__icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.guarantee-box__title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--gold-dark);
  margin-bottom: 0.25rem;
}

.guarantee-box__text {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.6;
}

.form-card {
  padding: 2.25rem;
}

.form-card__title {
  font-family: "Syne", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 1.75rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.req {
  color: #e53e3e;
}

.opt {
  color: var(--dim);
  font-size: 0.9em;
  text-transform: none;
  letter-spacing: 0;
  font-family: "DM Sans", sans-serif;
}

.field-err {
  font-size: 0.76rem;
  color: #e53e3e;
  font-weight: 500;
}

.char-count {
  font-size: 0.7rem;
  color: var(--dim);
  text-align: right;
  margin-top: -0.25rem;
}

.api-error {
  padding: 0.85rem 1rem;
  background: rgba(229, 62, 62, 0.08);
  border: 1px solid rgba(229, 62, 62, 0.25);
  border-radius: 10px;
  font-size: 0.85rem;
  color: #c53030;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-icon {
  font-size: 1rem;
}

.form-footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}

.form-note {
  font-size: 0.78rem;
  color: var(--dim);
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.success-state {
  text-align: center;
  padding: 3rem 1.5rem;
}

.success-state__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success-state__title {
  font-family: "Syne", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 0.65rem;
}

.success-state__body {
  color: var(--muted);
  line-height: 1.75;
  max-width: 380px;
  margin: 0 auto 1.75rem;
}

.success-state__actions {
  display: flex;
  gap: 0.85rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Disabled input styles */
.vk-input:disabled,
.vk-select:disabled,
.vk-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 960px) {
  .book-layout {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .form-card {
    padding: 1.5rem;
  }
}
</style>
