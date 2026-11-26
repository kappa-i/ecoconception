<!--
  Étape 1 — Lieu de départ (réponses seulement : la question est affichée par QuestionnaireModal).
  Un champ texte (ville ou gare) + « Utiliser ma position ».
  La position est comparée à une petite liste de gares (app/data/gares.js),
  directement dans le navigateur : aucun service de géolocalisation externe n'est appelé.
-->
<script setup>
import { gares } from '~/data/gares'

// v-model : la valeur du champ est gardée dans le questionnaire (QuestionnaireModal).
const depart = defineModel({ type: String, default: '' })

// Message affiché sous le bouton (recherche en cours, erreur…).
const positionMessage = ref('')

// Cherche la gare la plus proche d'un point GPS.
// À l'échelle de la Suisse, une simple distance « à vol d'oiseau » sur les
// coordonnées suffit pour trouver la gare la plus proche.
function findNearestStation (latitude, longitude) {
  let nearestStation = null
  let smallestDistance = Infinity

  for (const gare of gares) {
    const latitudeGap = gare.lat - latitude
    const longitudeGap = gare.lon - longitude
    const distance = latitudeGap * latitudeGap + longitudeGap * longitudeGap

    if (distance < smallestDistance) {
      smallestDistance = distance
      nearestStation = gare
    }
  }

  return nearestStation
}

function useMyPosition () {
  if (!navigator.geolocation) {
    positionMessage.value = 'Votre navigateur ne donne pas la position. Tapez votre ville.'
    return
  }

  positionMessage.value = 'Recherche de votre position…'

  navigator.geolocation.getCurrentPosition(
    function onSuccess (position) {
      const station = findNearestStation(position.coords.latitude, position.coords.longitude)
      depart.value = station.name
      positionMessage.value = 'Gare la plus proche : ' + station.name + '.'
    },
    function onError () {
      positionMessage.value = 'Position indisponible. Tapez votre ville.'
    }
  )
}
</script>

<template>
  <div class="depart">
    <div class="field">
      <label for="questionnaire-depart" class="field__label t-caption">Ville ou gare</label>
      <input
        id="questionnaire-depart"
        v-model="depart"
        class="field__input t-h3"
        type="text"
        placeholder="Lausanne, Martigny, Zoug…"
        autocomplete="address-level2"
        autofocus
      >
    </div>

    <button type="button" class="link-button t-label-button" @click="useMyPosition">
      Utiliser ma position
    </button>
    <p class="depart__message t-body-small" aria-live="polite">{{ positionMessage }}</p>
  </div>
</template>

<style scoped>
.depart {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.depart__message {
  color: var(--color-text-meta);
}

/* Field : petit label gris, valeur en grand, filet en bas (2 px au focus). */
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-text-primary);
}

.field:focus-within {
  padding-bottom: 11px;
  border-bottom-width: 2px;
}

.field__label {
  color: var(--color-text-meta);
}

.field__input {
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text-primary);
}

.field__input::placeholder {
  color: var(--color-text-meta);
}

.field__input:focus {
  outline: none;
}

/* Button / Style=Link : lien texte souligné. */
.link-button {
  padding: var(--spacing-2xs) 0;
  border: 0;
  background: none;
  color: var(--color-text-primary);
  font-family: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.link-button:hover {
  color: var(--color-red-swiss);
}
</style>
