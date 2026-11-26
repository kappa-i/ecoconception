<!--
  Progress : une barre par étape (faite = noire et plus épaisse, à venir = grise)
  + le compteur « 02 / 07 — Destination ».
  Le nombre total d'étapes peut changer (6 si l'étape Hébergement est sautée).
-->
<script setup>
const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  label: { type: String, required: true }
})

// Affiche toujours deux chiffres : 2 → « 02 ».
function twoDigits (number) {
  return String(number).padStart(2, '0')
}

const counterText = computed(() => {
  return twoDigits(props.current) + ' / ' + twoDigits(props.total) + ' —'
})
</script>

<template>
  <div class="progress">
    <div class="progress__segments" aria-hidden="true">
      <span
        v-for="segment in total"
        :key="segment"
        class="progress__segment"
        :class="{ 'progress__segment--done': segment <= current }"
      />
    </div>
    <p class="progress__counter t-caption">
      <span>{{ counterText }}</span>
      <span>{{ label }}</span>
    </p>
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress__segments {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.progress__segment {
  flex: 1;
  height: 1px;
  background: var(--color-border-rule);
}

.progress__segment--done {
  height: 2px;
  background: var(--color-text-primary);
}

.progress__counter {
  display: flex;
  gap: 6px;
  color: var(--color-text-meta);
}
</style>
