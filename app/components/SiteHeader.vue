<!--
  Header v2 — mise en page « Double » sur photo.
  Mobile : les mêmes liens dans un <details> HTML (« Menu »), sans JavaScript.
-->
<script setup>
defineProps({
  showCta: { type: Boolean, default: true }
})

const links = [
  { to: '/activites', label: 'Activités', active: true },
  { to: '/regions', label: 'Régions' },
  { to: '/recherche', label: 'Recherche' }
]

const languages = [
  { code: 'fr', label: 'FR', name: 'Français', active: true },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'en', label: 'EN', name: 'English' }
]
</script>

<template>
  <header class="header t-label-button">
    <BrandMark inverse class="header__brand" />

    <template v-for="variant in ['desktop', 'mobile']" :key="variant">
      <component
        :is="variant === 'mobile' ? 'details' : 'div'"
        :class="variant === 'mobile' ? 'header__menu' : 'header__bar'"
      >
        <summary v-if="variant === 'mobile'">Menu</summary>
        <div class="header__panel">
          <nav class="header__nav" :aria-label="variant === 'mobile' ? 'Navigation principale (mobile)' : 'Navigation principale'">
            <NuxtLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :class="{ 'is-dim': !link.active }"
              :aria-current="link.active ? 'page' : undefined"
            >{{ link.label }}</NuxtLink>
          </nav>

          <div class="header__right">
            <ul class="header__langs" aria-label="Langue">
              <li v-for="lang in languages" :key="lang.code">
                <a
                  :href="lang.active ? '/' : `/${lang.code}/`"
                  :lang="lang.code"
                  :hreflang="lang.code"
                  :title="lang.name"
                  :class="{ 'is-dim': !lang.active }"
                  :aria-current="lang.active ? 'true' : undefined"
                >{{ lang.label }}</a>
              </li>
            </ul>
            <NuxtLink v-if="showCta" to="/questionnaire" class="header__cta">Organiser mon séjour</NuxtLink>
          </div>
        </div>
      </component>
    </template>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) var(--page-gutter);
  color: var(--color-text-inverse);
}

.header a {
  text-decoration: none;
}

.header__brand {
  flex: 1;
}

.header__panel {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xl);
}

.header__nav {
  display: flex;
  gap: var(--spacing-lg);
}

.header__right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 212px;
}

.header__langs {
  display: flex;
  gap: 8px;
}

.header .header__cta {
  text-decoration: underline;
}

.is-dim {
  opacity: 0.65;
}

.header a:hover {
  opacity: 1;
}

.header__menu {
  display: none;
}

@media (max-width: 800px) {
  .header {
    align-items: center;
  }

  .header__bar {
    display: none;
  }

  .header__menu {
    display: block;
    position: relative;
  }

  .header__menu summary {
    cursor: pointer;
    list-style: none;
    padding: 8px 0;
  }

  .header__menu summary::-webkit-details-marker {
    display: none;
  }

  .header__menu .header__panel {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 2;
    flex-direction: column;
    gap: var(--spacing-lg);
    min-width: 220px;
    padding: var(--spacing-lg);
    background: var(--color-bg-inverse);
  }

  .header__menu .header__nav {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .header__menu .header__right {
    width: auto;
    gap: var(--spacing-md);
  }
}
</style>
