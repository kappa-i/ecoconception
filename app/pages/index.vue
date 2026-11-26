<!-- Accueil — maquette Figma « Accueil — complète ». -->
<script setup>
import { activities, cantons, envies, events } from '~/data/home'

const activeCanton = ref(null)
const cantonInfo = computed(() => activeCanton.value && cantons[activeCanton.value])

// Le questionnaire s'ouvre quand l'URL contient ?questionnaire
// (bouton du hero, liens « Par envie »…). Le bouton Retour du navigateur le referme.
const route = useRoute()

const isQuestionnaireOpen = computed(() => {
  return route.query.questionnaire !== undefined
})

function closeQuestionnaire () {
  // On enlève les paramètres du questionnaire de l'URL, sans recharger la page.
  navigateTo({ path: '/', query: {} }, { replace: true })
}
</script>

<template>
  <div>
    <HomeHero />

    <!-- ClientOnly : le pop-up n'existe que dans le navigateur (il a besoin de JavaScript). -->
    <ClientOnly>
      <QuestionnaireModal v-if="isQuestionnaireOpen" @close="closeQuestionnaire" />
    </ClientOnly>

    <main>
      <!-- Par envie : fond blanc -->
      <section class="section section--envie" aria-labelledby="envie-title">
        <div class="section__inner">
          <SectionHeading id="envie-title" kicker="Par envie" title="Vous avez envie de…">
            <p class="envie-help t-body-small">
              Choisissez une envie, on vous pose<br>les autres questions ensuite.
            </p>
          </SectionHeading>
          <ul class="envie-grid">
            <li v-for="envie in envies" :key="envie.slug">
              <EnvieLink v-bind="envie" />
            </li>
          </ul>
        </div>
      </section>

      <!-- Idées : fond muted -->
      <section class="section section--muted" aria-labelledby="idees-title">
        <div class="section__inner">
          <SectionHeading id="idees-title" kicker="Idées près de chez vous" title="Ce week-end, près de chez vous">
            <template #title>Ce week-end,<br>près de chez vous</template>
            <TextLink to="/activites">Toutes les activités</TextLink>
          </SectionHeading>
          <div class="cards">
            <ActivityCard v-for="activity in activities" :key="activity.slug" v-bind="activity" />
          </div>
        </div>
      </section>

      <!-- Explorer : fond blanc -->
      <section class="section" aria-labelledby="explorer-title">
        <div class="section__inner">
          <SectionHeading id="explorer-title" kicker="Par région" title="Explorer la Suisse">
            <TextLink to="/regions">Toutes les régions</TextLink>
          </SectionHeading>
          <div class="map-row">
            <div class="map-row__side">
              <p class="map-row__help">
                Survolez un canton pour voir son nom, cliquez pour y organiser votre séjour.
              </p>
              <div class="canton-info" aria-live="polite">
                <template v-if="cantonInfo">
                  <p class="t-h2">{{ cantonInfo.name }}</p>
                  <p class="canton-info__count t-body-small">{{ cantonInfo.count }} activités</p>
                </template>
              </div>
            </div>
            <CantonMap class="map-row__map" :cantons="cantons" @highlight="activeCanton = $event" />
          </div>
        </div>
      </section>

      <!-- Agenda : fond inverse -->
      <section class="section section--inverse" aria-labelledby="agenda-title">
        <div class="section__inner">
          <SectionHeading id="agenda-title" kicker="Agenda" title="Prochaines manifestations">
            <TextLink to="/agenda">Tout l’agenda</TextLink>
          </SectionHeading>
          <ul class="events">
            <InfoRow v-for="event in events" :key="event.date" as="li">
              <template #label>
                <time :datetime="event.date">{{ event.label }}</time>
              </template>
              {{ event.title }}
            </InfoRow>
          </ul>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.section__inner > :first-child {
  margin-bottom: 40px;
}

/* Par envie */
.envie-help {
  color: var(--color-text-meta);
  text-align: right;
}

.envie-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px var(--spacing-lg);
}

.section--envie .section__inner > :first-child {
  margin-bottom: var(--spacing-2xl);
}

/* Idées */
.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-lg);
}

/* Explorer */
.map-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2xl);
}

.map-row__side {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 0 0 336px;
}

.map-row__help {
  color: var(--color-text-meta);
}

.canton-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.canton-info__count {
  color: var(--color-text-meta);
}

.map-row__map {
  flex: 1;
  min-width: 0;
  max-width: 720px;
}

@media (max-width: 900px) {
  .envie-grid,
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .map-row {
    flex-direction: column;
  }

  .map-row__side {
    flex-basis: auto;
  }

  .map-row__map {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .envie-grid,
  .cards {
    grid-template-columns: minmax(0, 1fr);
  }

  .envie-help {
    text-align: left;
  }
}
</style>
