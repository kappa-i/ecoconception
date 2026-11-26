<!--
  EnvieLink : un mot en très grand + le nombre d'activités. Aucune image.
  Ouvre le questionnaire avec l'envie déjà cochée (?envie=nature).
  Survol / focus : mot en rouge, filet noir de 2 px (sans décaler la mise en page).
-->
<script setup>
defineProps({
  slug: { type: String, required: true },
  word: { type: String, required: true },
  count: { type: Number, required: true }
})
</script>

<template>
  <NuxtLink :to="{ path: '/questionnaire', query: { envie: slug } }" class="envie">
    <span class="envie__word t-h2">{{ word }}</span>
    <span class="envie__count t-body-small">{{ count }} activités</span>
  </NuxtLink>
</template>

<style scoped>
.envie {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-rule);
  text-decoration: none;
  transition: border-color 0.15s;
}

.envie__word {
  transition: color 0.15s;
}

.envie__count {
  color: var(--color-text-meta);
}

.envie:hover,
.envie:focus-visible {
  border-top-color: var(--color-text-primary);
  box-shadow: inset 0 1px 0 var(--color-text-primary);
}

.envie:hover .envie__word,
.envie:focus-visible .envie__word {
  color: var(--color-red-swiss);
}

.envie:focus-visible {
  outline-offset: 6px;
}
</style>
