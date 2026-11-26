<!--
  Étape 2 — Destination : un ou plusieurs cantons sur la carte, ou « Peu importe ».
  Chaque canton est une case à cocher (role="checkbox") : clic, ou Tab puis Espace / Entrée.
  Survol = gris moyen, sélectionné = noir (états du composant Questionnaire/CantonMap).
-->
<script setup>
import rawSvg from '~/assets/cantons.svg?raw'
import { cantons } from '~/data/home'

// v-model:cantons → liste des codes choisis, ex. ['GR', 'BE']
const selectedCantons = defineModel('cantons', { type: Array, default: () => [] })
// v-model:surprise → true si l'utilisateur a choisi « Peu importe »
const surprise = defineModel('surprise', { type: Boolean, default: false })

const emit = defineEmits(['next'])

// Le fichier SVG contient une ligne par canton : <path id="VD" d="…"/>.
// On récupère le code et le tracé de chaque canton pour dessiner la carte avec Vue.
const cantonShapes = []
const pathPattern = /<path id="([A-Z]{2})" d="([^"]+)"\/>/g
for (const match of rawSvg.matchAll(pathPattern)) {
  cantonShapes.push({ code: match[1], path: match[2] })
}

function cantonName (code) {
  return cantons[code].name
}

function isSelected (code) {
  return selectedCantons.value.includes(code)
}

// Clic sur un canton : on l'ajoute s'il n'est pas choisi, on l'enlève sinon.
function toggleCanton (code) {
  const newSelection = [...selectedCantons.value]
  const position = newSelection.indexOf(code)

  if (position === -1) {
    newSelection.push(code)
  } else {
    newSelection.splice(position, 1)
  }

  selectedCantons.value = newSelection
  surprise.value = false
}

// Texte sous la carte : « Grisons, Berne, Lucerne »
const selectionText = computed(() => {
  const names = []
  for (const code of selectedCantons.value) {
    names.push(cantonName(code))
  }
  return names.join(', ')
})

function chooseSurprise () {
  selectedCantons.value = []
  surprise.value = true
  emit('next')
}

// --- Étiquette avec le nom du canton survolé (ordinateur seulement, voir le CSS) ---
const mapWrapper = ref(null)
const hoveredCanton = ref(null)
const tooltipX = ref(0)
const tooltipY = ref(0)

function showTooltip (code) {
  hoveredCanton.value = code
}

function hideTooltip () {
  hoveredCanton.value = null
}

// L'étiquette suit la souris : position calculée par rapport au coin de la carte.
function moveTooltip (event) {
  const mapBox = mapWrapper.value.getBoundingClientRect()
  tooltipX.value = event.clientX - mapBox.left
  tooltipY.value = event.clientY - mapBox.top
}
</script>

<template>
  <div class="destination">
    <div ref="mapWrapper" class="destination__map">
      <svg
        class="destination__svg"
        width="720"
        height="509"
        viewBox="0 0 720 509"
        role="group"
        aria-label="Carte des cantons : choisissez un ou plusieurs cantons"
        @mousemove="moveTooltip"
      >
        <path
          v-for="canton in cantonShapes"
          :key="canton.code"
          class="canton"
          :class="{ 'canton--selected': isSelected(canton.code) }"
          :d="canton.path"
          role="checkbox"
          tabindex="0"
          :aria-label="cantonName(canton.code)"
          :aria-checked="isSelected(canton.code) ? 'true' : 'false'"
          @click="toggleCanton(canton.code)"
          @keydown.enter.prevent="toggleCanton(canton.code)"
          @keydown.space.prevent="toggleCanton(canton.code)"
          @mouseenter="showTooltip(canton.code)"
          @mouseleave="hideTooltip"
        />
      </svg>

      <!-- aria-hidden : les lecteurs d'écran ont déjà le nom de chaque canton (aria-label). -->
      <span
        v-if="hoveredCanton"
        class="tooltip t-caption"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
        aria-hidden="true"
      >
        {{ cantonName(hoveredCanton) }}
      </span>
    </div>

    <div class="destination__selection">
      <p class="destination__chosen t-label-tag" aria-live="polite">
        <template v-if="selectedCantons.length > 0">
          {{ selectionText }}<br>
          <span class="destination__hint">+ ajouter un canton</span>
        </template>
        <template v-else-if="surprise">
          Peu importe : on vous surprend
        </template>
        <template v-else>
          Cliquez sur un ou plusieurs cantons
        </template>
      </p>
      <button type="button" class="back-link t-label-button" @click="chooseSurprise">
        Peu importe, surprenez-moi
      </button>
    </div>
  </div>
</template>

<style scoped>
.destination {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.destination__map {
  position: relative;
  width: 100%;
  max-width: 460px;
}

.destination__svg {
  width: 100%;
  height: auto;
}

/* Étiquette noire au-dessus de la souris. pointer-events: none : elle ne gêne pas le clic. */
.tooltip {
  position: absolute;
  padding: 4px 8px;
  background: var(--color-bg-inverse);
  color: var(--color-text-inverse);
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 12px));
}

/* Sur un écran tactile (pas de survol), pas d'étiquette. */
@media (hover: none) {
  .tooltip {
    display: none;
  }
}

.canton {
  fill: var(--color-border-rule);
  stroke: var(--color-bg-surface);
  stroke-width: 2.4;
  stroke-linejoin: round;
  cursor: pointer;
  transition: fill 0.15s;
}

.canton:hover {
  fill: var(--color-text-muted);
}

.canton--selected,
.canton--selected:hover {
  fill: var(--color-text-primary);
}

/* Pas de cadre du navigateur quand on clique sur un canton. */
.canton:focus {
  outline: none;
}

/* Au clavier seulement : contour rouge qui suit la forme du canton. */
.canton:focus-visible {
  stroke: var(--color-red-swiss);
}

.destination__selection {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.destination__hint {
  color: var(--color-text-meta);
}

/* Button / Style=Back : lien texte gris souligné. */
.back-link {
  padding: var(--spacing-2xs) 0;
  border: 0;
  background: none;
  color: var(--color-text-meta);
  font-family: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.back-link:hover {
  color: var(--color-text-primary);
}
</style>
