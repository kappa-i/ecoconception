<!-- Pied de page : marque, crédits photo (obligatoires, licences CC), liens. -->
<script setup>
const links = [
  { to: '/a-propos', label: 'À propos' },
  { to: '/accessibilite', label: 'Accessibilité' },
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/contact', label: 'Contact' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <BrandMark />
        <p class="footer__credits t-caption">Photos : Markus Spiske (CC BY 2.0), Pimlico27 (CC BY-SA 4.0)</p>
      </div>
      <nav aria-label="Pied de page">
        <ul class="footer__links t-label-button">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--spacing-3xl) var(--page-gutter);
  border-top: 1px solid var(--color-border-rule);
  background: var(--color-bg-surface);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacing-xl);
  max-width: var(--page-max);
  margin-inline: auto;
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__credits {
  color: var(--color-text-meta);
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 174px;
}

.footer__links a {
  text-decoration: none;
}

.footer__links a:hover {
  text-decoration: underline;
}
</style>
