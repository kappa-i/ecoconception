<!-- Button / Style=Link : lien texte souligné, sans flèche. -->
<script setup>
defineProps({
  to: { type: String, required: true }
})
</script>

<template>
  <NuxtLink :to="to" class="text-link t-label-button"><slot /></NuxtLink>
</template>

<style scoped>
.text-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding-block: var(--spacing-2xs);
  color: inherit;
  text-decoration: underline;
  text-underline-position: from-font;
  white-space: nowrap;
}

/* Agrandit la zone cliquable (44 px) sans changer la mise en page. */
.text-link::after {
  content: "";
  position: absolute;
  inset: -8px -4px;
}

.text-link:hover {
  color: var(--ctx-link-hover);
}
</style>
