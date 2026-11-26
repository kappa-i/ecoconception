<!-- InfoRow : libellé gris (colonne 180 px) + valeur, filet au-dessus. -->
<script setup>
defineProps({
  as: { type: String, default: 'div' }
})
</script>

<template>
  <component :is="as" class="info-row">
    <span class="info-row__label t-label-tag"><slot name="label" /></span>
    <span class="info-row__value"><slot /></span>
  </component>
</template>

<style scoped>
.info-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  padding-block: var(--spacing-md);
  border-top: 1px solid var(--ctx-rule);
}

.info-row__label {
  flex: 0 0 180px;
  color: var(--ctx-meta);
}

.info-row__value {
  flex: 1;
  min-width: 0;
}

@media (max-width: 600px) {
  .info-row {
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  .info-row__label {
    flex-basis: auto;
  }
}
</style>
