<!--
  Liste de réponses d'une étape du questionnaire (étapes 3 à 7).
  - Un seul choix (par défaut) : v-model contient la valeur choisie, ex. 'journee'.
  - Plusieurs choix (multiple) : v-model contient une liste, ex. ['nature', 'culture'].
  Le <fieldset> regroupe les réponses ; son nom est la question de l'étape (#question-title).
-->
<script setup>
const props = defineProps({
  name: { type: String, required: true },
  options: { type: Array, required: true },
  multiple: { type: Boolean, default: false }
})

const selection = defineModel({ type: [String, Array], default: '' })

function isChecked (value) {
  if (props.multiple) {
    return selection.value.includes(value)
  }
  return selection.value === value
}

function choose (value) {
  // Un seul choix : on remplace simplement la valeur.
  if (!props.multiple) {
    selection.value = value
    return
  }

  // Plusieurs choix : on ajoute la valeur si elle n'y est pas, on l'enlève sinon.
  const newSelection = [...selection.value]
  const position = newSelection.indexOf(value)

  if (position === -1) {
    newSelection.push(value)
  } else {
    newSelection.splice(position, 1)
  }

  selection.value = newSelection
}
</script>

<template>
  <fieldset class="choices" aria-labelledby="question-title">
    <QuestionnaireAnswer
      v-for="option in options"
      :key="option.value"
      :type="multiple ? 'checkbox' : 'radio'"
      :name="name"
      :value="option.value"
      :label="option.label"
      :meta="option.meta"
      :checked="isChecked(option.value)"
      @change="choose(option.value)"
    />
  </fieldset>
</template>

<style scoped>
.choices {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
