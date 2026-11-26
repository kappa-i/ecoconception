<!--
  ActivityCard : photo duotone (lazy-loading), titre, puis deux colonnes d'infos
  sous un filet : lieu (gris) et durée / prix (noir). Survol : titre souligné.
  Toute la carte est cliquable via le lien du titre.
-->
<script setup>
defineProps({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  place: { type: String, required: true },
  facts: { type: Array, required: true },
  // Sans image : bloc noir à la place de la photo.
  image: { type: Object, default: null }
})
</script>

<template>
  <article class="card">
    <!--
      Largeur affichée (grille de index.vue) : 1 colonne < 600 px, 2 colonnes < 900 px,
      puis 352 px (maquette). Nuxt Image : chaque valeur s'applique à partir de son écran.
    -->
    <NuxtImg
      v-if="image"
      class="card__image"
      :src="image.src"
      :width="image.width"
      :height="image.height"
      sizes="390:100vw 600:50vw 900:352px"
      format="webp"
      alt=""
      loading="lazy"
      decoding="async"
    />
    <div v-else class="card__image" aria-hidden="true" />
    <h3 class="card__title t-h4">
      <NuxtLink :to="`/activites/${slug}`" class="card__link">{{ title }}</NuxtLink>
    </h3>
    <div class="card__info t-label-tag">
      <p class="card__place">{{ place }}</p>
      <p class="card__facts">
        <template v-for="(fact, i) in facts" :key="fact">
          <br v-if="i > 0">{{ fact }}
        </template>
      </p>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.card__image {
  width: 100%;
  height: 264px;
  object-fit: cover;
  background: #000;
}

.card__link {
  text-decoration: none;
}

/* Étend la zone cliquable du lien à toute la carte. */
.card__link::after {
  content: "";
  position: absolute;
  inset: 0;
}

.card:hover .card__link {
  text-decoration: underline;
}

.card__info {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding-top: 12px;
  border-top: 1px solid var(--color-border-rule);
}

.card__place {
  flex: 1;
  min-width: 0;
  color: var(--color-text-meta);
}

.card__facts {
  white-space: nowrap;
}
</style>
