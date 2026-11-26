<!--
  Answer (taille Medium) : une réponse du questionnaire en grande liste typographique.
  Gris par défaut, gris foncé au survol, noir quand elle est choisie. Colonne d'infos à droite.
  C'est un vrai bouton radio (ou case à cocher) caché visuellement : le clavier
  et les lecteurs d'écran fonctionnent comme avec un formulaire classique.
-->
<script setup>
defineProps({
  type: { type: String, default: 'radio' }, // 'radio' (un seul choix) ou 'checkbox' (plusieurs)
  name: { type: String, required: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  meta: { type: String, default: '' },
  checked: { type: Boolean, default: false }
})

const emit = defineEmits(['change'])
</script>

<template>
  <label class="answer" :class="{ 'answer--selected': checked }">
    <input
      class="visually-hidden"
      :type="type"
      :name="name"
      :value="value"
      :checked="checked"
      @change="emit('change')"
    >
    <span class="answer__label">{{ label }}</span>
    <span class="answer__meta t-label-tag">{{ meta }}</span>
  </label>
</template>

<style scoped>
.answer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-lg);
  color: var(--color-text-muted);
  cursor: pointer;
}

.answer__label {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 56px;
  line-height: 1;
  letter-spacing: -0.04em;
  transition: color 0.15s;
}

.answer__meta {
  flex: 0 0 170px;
  padding-top: 10px;
  color: var(--color-text-meta);
  /* Respecte les retours à la ligne (\n) des textes. */
  white-space: pre-line;
}

.answer:hover {
  color: var(--color-text-meta);
}

.answer--selected,
.answer--selected:hover,
.answer--selected .answer__meta {
  color: var(--color-text-primary);
}

/* Focus clavier : le bouton radio est caché, on souligne donc la réponse entière. */
.answer:has(input:focus-visible) {
  outline: 2px solid var(--color-red-swiss);
  outline-offset: 4px;
}

@media (max-width: 800px) {
  .answer__label {
    font-size: 40px;
  }

  .answer__meta {
    flex-basis: 120px;
    padding-top: 4px;
  }
}
</style>
