<!--
  Questionnaire : le pop-up en 7 étapes (cœur du concept, voir CONCEPT.md).
  - Affiche à gauche (la même pour toutes les étapes, chargée une seule fois),
    panneau à droite : progression + Fermer, question, réponses, Retour / Suivant.
  - Les réponses restent dans le navigateur pendant tout le questionnaire :
    aucune requête entre les étapes, une seule à la fin (la page résultats).
  - <dialog> natif : le navigateur gère le focus, la touche Échap et le fond assombri.
-->
<script setup>
import { questionnaireSteps } from '~/data/questionnaire'
import { cantons } from '~/data/home'

const emit = defineEmits(['close'])
const route = useRoute()

// Toutes les réponses de l'utilisateur.
const answers = reactive({
  depart: '',
  cantons: [],
  surprise: false,
  duree: '',
  hebergement: '',
  budget: '',
  avecQui: '',
  envies: []
})

// Questionnaire ouvert depuis la carte de l'accueil (?canton=VD) ?
// La destination est alors déjà connue : on commence par « Où aimeriez-vous aller ? »
// (avec le canton déjà coché), puis « D'où partez-vous ? ».
const canton = String(route.query.canton || '')
const startsWithDestination = cantons[canton] !== undefined

if (startsWithDestination) {
  answers.cantons.push(canton)
}

// L'ordre des questions : normal, ou départ et destination inversés.
function orderedSteps () {
  if (!startsWithDestination) {
    return questionnaireSteps
  }

  const departStep = questionnaireSteps[0]
  const destinationStep = questionnaireSteps[1]
  const otherSteps = questionnaireSteps.slice(2)

  return [destinationStep, departStep, ...otherSteps]
}

// Les étapes réellement posées.
// Pour « Une journée », il n'y a pas de nuit, donc pas de question sur l'hébergement :
// on saute cette étape et le compteur passe de 7 à 6.
const visibleSteps = computed(() => {
  const steps = []

  for (const step of orderedSteps()) {
    const isHebergementStep = step.id === 'hebergement'
    const isDayTrip = answers.duree === 'journee'

    if (isHebergementStep && isDayTrip) {
      continue
    }
    steps.push(step)
  }

  return steps
})

// On commence par la première étape de la liste (départ, ou destination si on vient de la carte).
const currentStepId = ref(visibleSteps.value[0].id)

const currentIndex = computed(() => {
  return visibleSteps.value.findIndex(step => step.id === currentStepId.value)
})

const currentStep = computed(() => {
  return visibleSteps.value[currentIndex.value]
})

const isFirstStep = computed(() => currentIndex.value === 0)
const isLastStep = computed(() => currentIndex.value === visibleSteps.value.length - 1)

// Une étape est-elle remplie ? Tant qu'elle ne l'est pas, « Suivant » est désactivé.
function isStepAnswered (stepId) {
  if (stepId === 'depart') {
    return answers.depart.trim() !== ''
  }
  if (stepId === 'destination') {
    return answers.cantons.length > 0 || answers.surprise
  }
  if (stepId === 'duree') {
    return answers.duree !== ''
  }
  if (stepId === 'hebergement') {
    return answers.hebergement !== ''
  }
  if (stepId === 'budget') {
    return answers.budget !== ''
  }
  if (stepId === 'avecQui') {
    return answers.avecQui !== ''
  }
  // Les envies (étape 7) sont facultatives : on peut toujours valider.
  return true
}

const canGoNext = computed(() => isStepAnswered(currentStepId.value))

function goBack () {
  if (isFirstStep.value) {
    return
  }
  const previousStep = visibleSteps.value[currentIndex.value - 1]
  currentStepId.value = previousStep.id
}

function goNext () {
  if (!canGoNext.value) {
    return
  }
  if (isLastStep.value) {
    showResults()
    return
  }
  const nextStep = visibleSteps.value[currentIndex.value + 1]
  currentStepId.value = nextStep.id
}

// Fin du questionnaire : la seule requête, vers la page résultats, avec toutes les réponses dans l'URL.
function showResults () {
  const query = {
    depart: answers.depart.trim()
  }

  // Cantons : « GR,BE,LU », ou « surprise » si l'utilisateur a choisi « Peu importe ».
  if (answers.surprise) {
    query.cantons = 'surprise'
  } else {
    query.cantons = answers.cantons.join(',')
  }

  query.duree = answers.duree

  // Hébergement : seulement si la question a été posée (pas pour « Une journée »).
  // Sans « oui », la page résultats n'affichera aucun hôtel.
  if (answers.duree !== 'journee') {
    query.hebergement = answers.hebergement
  }

  query.budget = answers.budget
  query.avecQui = answers.avecQui

  // Envies : « nature,culture » (facultatif).
  if (answers.envies.length > 0) {
    query.envies = answers.envies.join(',')
  }

  navigateTo({ path: '/resultats', query })
}

// --- Pré-remplissage depuis l'URL ---
// ?depart=Lausanne&etape=2 (formulaire du hero) · ?envie=nature (section « Par envie »)
if (route.query.depart) {
  answers.depart = String(route.query.depart)
}
if (route.query.envie) {
  answers.envies.push(String(route.query.envie))
}
if (route.query.etape) {
  const stepNumber = Number(route.query.etape)
  const requestedStep = visibleSteps.value[stepNumber - 1]
  if (requestedStep) {
    currentStepId.value = requestedStep.id
  }
}

// --- Accessibilité : à chaque changement d'étape, le focus va sur la nouvelle question,
// pour que les lecteurs d'écran l'annoncent. ---
const questionTitle = ref(null)

watch(currentStepId, async () => {
  await nextTick() // attend que la nouvelle étape soit affichée
  questionTitle.value.focus()
})

// --- Ouverture / fermeture du <dialog> ---
const dialogElement = ref(null)

onMounted(() => {
  dialogElement.value.showModal()
})

function closeQuestionnaire () {
  dialogElement.value.close()
}
</script>

<template>
  <dialog
    ref="dialogElement"
    class="questionnaire"
    aria-labelledby="question-title"
    @close="emit('close')"
  >
    <!--
      Affiche : décorative, chargée seulement à l'ouverture du pop-up (34 Ko en WebP).
      Simple <img> et pas <NuxtImg> : le pop-up n'existe que dans le navigateur, donc Nuxt Image
      ne verrait pas l'image pendant `nuxt generate`. Le WebP a été converti une fois pour toutes.
      loading="lazy" : sur mobile l'affiche est masquée (display: none), le navigateur ne la télécharge pas.
    -->
    <div class="questionnaire__poster" aria-hidden="true">
      <img
        class="questionnaire__poster-image"
        src="/images/affiche-alpinism.webp"
        width="524"
        height="746"
        loading="lazy"
        alt=""
      >
    </div>

    <!-- Un <form> : la touche Entrée passe à l'étape suivante. -->
    <form class="questionnaire__panel" @submit.prevent="goNext">
      <div class="questionnaire__main">
        <div class="questionnaire__top">
          <QuestionnaireProgress
            class="questionnaire__progress"
            :current="currentIndex + 1"
            :total="visibleSteps.length"
            :label="currentStep.label"
          />
          <button type="button" class="questionnaire__close t-label-button" @click="closeQuestionnaire">
            Fermer <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div class="questionnaire__question">
          <h2 id="question-title" ref="questionTitle" class="questionnaire__title t-h3" tabindex="-1">
            {{ currentStep.question }}
          </h2>
          <p class="questionnaire__help t-body-small">{{ currentStep.help }}</p>
        </div>

        <!-- Les réponses de l'étape en cours : un composant par étape. -->
        <QuestionnaireStepDepart v-if="currentStepId === 'depart'" v-model="answers.depart" />
        <QuestionnaireStepDestination
          v-else-if="currentStepId === 'destination'"
          v-model:cantons="answers.cantons"
          v-model:surprise="answers.surprise"
          @next="goNext"
        />
        <QuestionnaireChoices
          v-else-if="currentStepId === 'duree'"
          v-model="answers.duree"
          name="duree"
          :options="currentStep.options"
        />
        <QuestionnaireChoices
          v-else-if="currentStepId === 'hebergement'"
          v-model="answers.hebergement"
          name="hebergement"
          :options="currentStep.options"
        />
        <QuestionnaireChoices
          v-else-if="currentStepId === 'budget'"
          v-model="answers.budget"
          name="budget"
          :options="currentStep.options"
        />
        <QuestionnaireChoices
          v-else-if="currentStepId === 'avecQui'"
          v-model="answers.avecQui"
          name="avecQui"
          :options="currentStep.options"
        />
        <QuestionnaireChoices
          v-else-if="currentStepId === 'envies'"
          v-model="answers.envies"
          name="envies"
          :options="currentStep.options"
          multiple
        />
      </div>

      <div class="questionnaire__footer">
        <button
          type="button"
          class="button button--secondary t-label-button"
          :disabled="isFirstStep"
          @click="goBack"
        >
          Retour
        </button>
        <button type="submit" class="button button--primary t-label-button" :disabled="!canGoNext">
          <template v-if="isLastStep">Voir les activités</template>
          <template v-else>Suivant</template>
        </button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
.questionnaire {
  width: min(1040px, 100% - 2 * var(--spacing-md));
  height: min(720px, 100% - 2 * var(--spacing-md));
  max-width: none;
  max-height: none;
  padding: 0;
  border: 0;
  box-shadow: 0 24px 64px rgba(28, 31, 36, 0.18);
  color: var(--color-text-primary);
}

/* display: flex seulement quand le dialog est ouvert (sinon il resterait visible). */
.questionnaire[open] {
  display: flex;
}

.questionnaire::backdrop {
  background: var(--color-overlay);
}

/* Affiche : calée en bas, le ciel crème se prolonge en aplat au-dessus. */
.questionnaire__poster {
  position: relative;
  flex: 0 0 380px;
  background: var(--color-poster-sky);
}

.questionnaire__poster-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.questionnaire__panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--spacing-xl);
  min-width: 0;
  padding: var(--spacing-2xl);
  overflow-y: auto;
}

.questionnaire__main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.questionnaire__top {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-xl);
}

.questionnaire__progress {
  flex: 1;
}

.questionnaire__question {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.questionnaire__help {
  color: var(--color-text-meta);
}

/* Le titre reçoit le focus par le code (pas au clavier) : pas besoin de contour. */
.questionnaire__title:focus {
  outline: none;
}

/* Button / Style=Back : lien texte gris. */
.questionnaire__close {
  padding: var(--spacing-2xs) 0;
  border: 0;
  background: none;
  color: var(--color-text-meta);
  font-family: inherit;
  cursor: pointer;
}

.questionnaire__close:hover {
  color: var(--color-text-primary);
}

.questionnaire__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Boutons à angles droits, sans flèche (Button Primary / Secondary). */
.button {
  padding: var(--spacing-md) var(--spacing-lg);
  border: 1px solid var(--color-text-primary);
  border-radius: 0;
  font-family: inherit;
  cursor: pointer;
}

.button--secondary {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
}

.button--primary {
  background: var(--color-bg-inverse);
  color: var(--color-text-inverse);
}

.button--primary:hover:not(:disabled) {
  border-color: var(--color-red-swiss);
  background: var(--color-red-swiss);
}

.button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* Mobile : plein écran, sans l'affiche (une image en moins à charger). */
@media (max-width: 800px) {
  .questionnaire {
    width: 100%;
    height: 100%;
  }

  .questionnaire__poster {
    display: none;
  }

  .questionnaire__panel {
    padding: var(--spacing-lg) var(--page-gutter);
  }
}
</style>
