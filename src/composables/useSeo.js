/**
 * useSeo.js
 * Composable for managing per-page SEO meta tags.
 * Call useSeo({ title, description, canonical }) in each view's <script setup>.
 */
export function useSeo({ title, description, canonical, image } = {}) {
  const siteName = "VividKode Creations";
  const baseUrl = "https://www.vividkode.dev";
  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} — Intelligent Digital Solutions`;

  // Title
  document.title = fullTitle;

  setMeta(
    "name",
    "description",
    description ||
      "VividKode Creations builds world-class websites, AI solutions, data pipelines, and custom software for ambitious businesses across Africa.",
  );
  setMeta("name", "robots", "index, follow");

  // OG
  setMeta("property", "og:title", fullTitle);
  setMeta("property", "og:description", description || "");
  setMeta("property", "og:url", canonical ? `${baseUrl}${canonical}` : baseUrl);
  setMeta("property", "og:image", image || `${baseUrl}/og-image.jpg`);

  // Twitter
  setMeta("name", "twitter:title", fullTitle);
  setMeta("name", "twitter:description", description || "");

  // Canonical
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = canonical ? `${baseUrl}${canonical}` : baseUrl;
}

function setMeta(attr, name, content) {
  let el = document.querySelector(`meta[${attr}='${name}']`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
