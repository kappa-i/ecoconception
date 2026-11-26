<!--
  Questionnaire/CantonMap : les 26 cantons en SVG inline
  (~42 Ko, ~16 Ko compressé : un seul <path> par canton, nommé par son code).
  Chaque canton est enveloppé dans un lien SVG :
  survol ou focus clavier → le canton passe en noir et son code est émis,
  clic / Entrée → ouvre le questionnaire avec ce canton déjà choisi comme destination
  (/?questionnaire&canton=VD).
-->
<script setup>
import rawSvg from '~/assets/cantons.svg?raw'

const props = defineProps({
  cantons: { type: Object, required: true },
  label: { type: String, default: 'Carte des cantons suisses' }
})

const emit = defineEmits(['highlight'])

const svg = rawSvg
  .replace('<svg ', `<svg role="group" aria-label="${props.label}" `)
  .replace(/<path id="([A-Z]{2})" (d="[^"]+")\/>/g, (_, code, d) => {
    const name = props.cantons[code]?.name ?? code
    return `<a href="/?questionnaire&amp;canton=${code}" class="canton" data-code="${code}" aria-label="${name}"><path ${d}/></a>`
  })

function cantonLink (event) {
  return event.target.closest?.('a.canton') ?? null
}

function onOver (event) {
  const link = cantonLink(event)
  if (link) emit('highlight', link.dataset.code)
}

function onLeave () {
  emit('highlight', null)
}

function onClick (event) {
  const link = cantonLink(event)
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return
  event.preventDefault()
  navigateTo(link.getAttribute('href'))
}
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div
    class="map"
    @mouseover="onOver"
    @focusin="onOver"
    @mouseleave="onLeave"
    @focusout="onLeave"
    @click="onClick"
    v-html="svg"
  />
</template>

<style scoped>
.map :deep(svg) {
  width: 100%;
  height: auto;
}

.map :deep(.canton path) {
  fill: var(--color-border-rule);
  stroke: var(--color-bg-surface);
  stroke-width: 2.4;
  stroke-linejoin: round;
  transition: fill 0.15s;
}

.map :deep(.canton:hover path),
.map :deep(.canton:focus-visible path) {
  fill: var(--color-text-primary);
}

/* Pas de cadre du navigateur autour du canton (clic ou clavier) :
   au clavier, le canton qui a le focus est déjà rempli en noir. */
.map :deep(.canton:focus),
.map :deep(.canton path:focus) {
  outline: none;
}
</style>
