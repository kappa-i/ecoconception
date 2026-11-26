<!--
  Hero de l'accueil : fond noir (photo retirée pour l'instant), en-tête Double, intro et CTA.
  - cta="inline" (Figma CTA=Inline) : la 1re question du questionnaire dans le hero.
    Formulaire HTML natif (GET, fonctionne sans JS) : « Commencer » ouvre le
    questionnaire directement à l'étape 2 avec le lieu de départ déjà rempli.
  - cta="button" (Figma CTA=Button) : bloc blanc « Organiser mon séjour ».
-->
<script setup>
defineProps({
  cta: {
    type: String,
    default: 'inline',
    validator: value => ['inline', 'button'].includes(value)
  },
  intro: {
    type: String,
    default: 'Quelques questions, et on vous emmène directement vers les bonnes activités'
  }
})
</script>

<template>
  <section class="hero">
    <SiteHeader :show-cta="false" class="hero__header" />

    <div class="hero__content" :class="`hero__content--${cta}`">
      <h1 class="hero__intro t-body-large">{{ intro }}</h1>

      <form v-if="cta === 'inline'" class="start" action="/questionnaire" method="get">
        <input type="hidden" name="etape" value="2">
        <p class="start__kicker t-label-tag">Commencez ici · 5 questions, 1 minute, sans inscription</p>
        <div class="start__row">
          <div class="start__field">
            <label for="hero-depart" class="start__label t-caption">D’où partez-vous ?</label>
            <input
              id="hero-depart"
              class="start__input"
              type="text"
              name="depart"
              placeholder="Lausanne, Martigny, Zoug…"
              autocomplete="address-level2"
              required
            >
          </div>
          <button type="submit" class="start__submit t-label-button">Commencer</button>
        </div>
      </form>

      <NuxtLink v-else to="/questionnaire" class="hero__cta">
        <span class="t-h4">Organiser mon séjour</span>
        <span class="hero__cta-meta t-caption">5 questions · 1 minute · sans inscription</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 720px;
  overflow: hidden;
  background: #000;
  color: var(--color-text-inverse);
}

.hero__header,
.hero__content {
  position: relative;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  padding: var(--spacing-2xl) var(--page-gutter);
}

.hero__intro {
  max-width: 563px;
}

.hero__content--inline .hero__intro {
  max-width: 620px;
}

/* CTA=Button */
.hero__cta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 28px;
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  text-decoration: none;
}

.hero__cta-meta {
  color: var(--color-text-meta);
}

.hero__cta:hover .t-h4 {
  text-decoration: underline;
}

/* CTA=Inline */
.start {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.start__kicker,
.start__label {
  opacity: 0.8;
}

.start__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--spacing-md);
}

.start__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
  width: 420px;
  max-width: 100%;
  padding-bottom: 10px;
  border-bottom: 1.5px solid var(--color-text-inverse);
}

.start__input {
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.start__input::placeholder {
  color: inherit;
  opacity: 0.6;
}

.start__input:focus {
  outline: none;
}

.start__field:focus-within {
  border-bottom-color: var(--color-red-swiss);
}

.start__submit {
  padding: var(--spacing-md) var(--spacing-lg);
  border: 0;
  border-radius: 0;
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  font-family: inherit;
  cursor: pointer;
}

.start__submit:hover {
  background: var(--color-red-swiss);
  color: var(--color-text-inverse);
}

@media (max-width: 800px) {
  .hero {
    min-height: 560px;
  }

  .hero__intro {
    font-size: 22px;
  }

  .start__input {
    font-size: 26px;
  }
}
</style>
