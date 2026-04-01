/**
 * useGsap.js
 * Centralised GSAP animation composable used across all views.
 * Uses ScrollTrigger for scroll-based reveals.
 */
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsap() {

  const triggers = []

  // ── Hero sequence (stagger reveal on mount) ─────────────────
  function heroSequence(elements, options = {}) {
    const defaults = {
      from: { opacity: 0, y: 50 },
      to:   { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out', delay: 0.15 },
    }
    const from = { ...defaults.from, ...(options.from || {}) }
    const to   = { ...defaults.to,   ...(options.to   || {}) }
    gsap.fromTo(elements.filter(Boolean), from, to)
  }

  // ── Scroll reveal for individual elements ───────────────────
  function scrollReveal(el, options = {}) {
    if (!el) return
    const tl = gsap.fromTo(
      el,
      { opacity: 0, y: options.y ?? 44, x: options.x ?? 0, scale: options.scale ?? 1 },
      {
        opacity: 1, y: 0, x: 0, scale: 1,
        duration:  options.duration  ?? 0.85,
        ease:      options.ease      ?? 'power2.out',
        delay:     options.delay     ?? 0,
        scrollTrigger: {
          trigger: el,
          start:   options.start   ?? 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    )
    triggers.push(tl.scrollTrigger)
    return tl
  }

  // ── Stagger reveal for a list of elements ───────────────────
  function staggerReveal(els, options = {}) {
    if (!els?.length) return
    const validEls = els.filter(Boolean)
    const tl = gsap.fromTo(
      validEls,
      { opacity: 0, y: options.y ?? 40 },
      {
        opacity: 1, y: 0,
        duration: options.duration ?? 0.75,
        stagger:  options.stagger  ?? 0.12,
        ease:     options.ease     ?? 'power2.out',
        scrollTrigger: {
          trigger: validEls[0],
          start:   options.start ?? 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    )
    triggers.push(tl.scrollTrigger)
    return tl
  }

  // ── Horizontal slide-in ─────────────────────────────────────
  function slideIn(el, direction = 'left', options = {}) {
    if (!el) return
    const x = direction === 'left' ? -50 : 50
    const tl = gsap.fromTo(
      el,
      { opacity: 0, x },
      {
        opacity: 1, x: 0,
        duration: options.duration ?? 0.85,
        ease: options.ease ?? 'power2.out',
        delay: options.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    )
    triggers.push(tl.scrollTrigger)
    return tl
  }

  // ── Counter / number animation ──────────────────────────────
  function countUp(el, target, options = {}) {
    if (!el) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: options.duration ?? 2,
      ease: 'power1.out',
      onUpdate: () => { el.textContent = Math.round(obj.val) + (options.suffix || '') },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    })
  }

  // ── Parallax ────────────────────────────────────────────────
  function parallax(el, speed = 0.3) {
    if (!el) return
    const tl = gsap.to(el, {
      y: () => el.offsetHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
    triggers.push(tl.scrollTrigger)
    return tl
  }

  // ── Cleanup on unmount ──────────────────────────────────────
  onUnmounted(() => {
    triggers.forEach(t => t?.kill())
    ScrollTrigger.getAll().forEach(t => t.kill())
  })

  return { gsap, ScrollTrigger, heroSequence, scrollReveal, staggerReveal, slideIn, countUp, parallax }
}
