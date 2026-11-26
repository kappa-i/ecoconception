<!-- Marque : logo + « Suisse Tourisme » + accroche (en-tête et pied de page). -->
<script setup>
defineProps({
  inverse: { type: Boolean, default: false }
})
</script>

<template>
  <NuxtLink to="/" class="brand t-label-button" :class="{ 'brand--inverse': inverse }">
    <span class="brand__wordmark">
      <LogoMark />
      Suisse Tourisme
    </span>
    <span class="brand__tag">La Suisse, sans aller loin</span>
  </NuxtLink>
</template>

<style scoped>
.brand {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
  color: var(--color-text-primary);
}

.brand__wordmark {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand__tag {
  padding-left: 30px;
  color: var(--color-text-meta);
}

.brand--inverse {
  color: var(--color-text-inverse);
}

.brand--inverse .brand__tag {
  color: inherit;
  opacity: 0.7;
}
</style>
