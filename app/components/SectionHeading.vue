<!-- En-tête de section : petit sur-titre, grand titre H2, slot à droite (lien ou aide). -->
<script setup>
defineProps({
  kicker: { type: String, required: true },
  title: { type: String, required: true },
  id: { type: String, default: undefined }
})
</script>

<template>
  <div class="heading">
    <div class="heading__titles">
      <p class="heading__kicker t-caption">{{ kicker }}</p>
      <h2 :id="id" class="t-h2">
        <slot name="title">{{ title }}</slot>
      </h2>
    </div>
    <div v-if="$slots.default" class="heading__aside">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--spacing-md) var(--spacing-xl);
}

.heading__titles {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.heading__kicker {
  color: var(--ctx-meta);
}
</style>
