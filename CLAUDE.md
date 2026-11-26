# CLAUDE.md

Projet d'école (HEIG-VD, Ingénierie des Médias) : version **écoconçue** du site de Suisse Tourisme, en **Nuxt 4**.
Objectif : éco-score **A**. L'écoconception compte pour **60 %** de la note : chaque choix doit pouvoir être justifié.

À lire pour le contexte : [README.md](README.md) · [CONCEPT.md](CONCEPT.md) · [DESIGN.md](DESIGN.md) · [JOURNAL.md](JOURNAL.md)
Maquettes Figma : https://www.figma.com/design/gb6WVkatyGXDzLrQVkjZWG

## 👤 Pour qui on code

Je suis **étudiant** : je dois comprendre et pouvoir expliquer tout le code (présentation orale et rapport).

- **Lisible avant tout.** Code simple, sans astuce. Je préfère du code **un peu plus long mais clair** à du code raccourci qu'on ne comprend plus.
- **Pas de one-liners compliqués** : pas de chaînes de `.map().filter().reduce()` imbriquées, pas de ternaires imbriqués, pas de déstructurations acrobatiques. Une étape par ligne, avec des variables intermédiaires bien nommées.
- **Noms explicites**, en anglais pour le code (`activeCanton`, `cantonInfo`), en français pour le contenu affiché.
- **Commentaires en français** qui expliquent le *pourquoi*, surtout pour les choix d'écoconception et d'accessibilité. Pas de commentaire qui répète ce que dit le code.
- **Pas d'abstraction prématurée** : pas de composant générique, de composable ou d'utilitaire tant qu'il ne sert qu'à un seul endroit.
- **Pas de nouvelle dépendance** sans me demander et sans expliquer ce qu'elle apporte (et ce qu'elle pèse).
- Toujours répondre en **français**.

## 📓 Journal : à compléter à chaque fois

**Avant chaque commit** (c'est moi qui pousse), compléter [JOURNAL.md](JOURNAL.md) :
- une entrée datée (`## JJ.MM.AAAA — Sujet`) en haut de la liste des entrées, ou compléter celle du jour ;
- ce qui a été codé, les fichiers touchés ;
- les **choix d'écoconception chiffrés** (poids avant / après, requêtes…) ;
- l'accessibilité ;
- les écarts avec la maquette et ce qui reste à faire.

Le journal sert de base au rapport : phrases claires, pas de jargon inutile.

## 🌿 Git

- **Ne jamais pousser** : je pousse moi-même.
- Travailler sur une **branche**, jamais directement sur `main`.
- Avant de commencer un nouveau travail : partir d'un `main` **à jour** (`git switch main && git pull`) et créer une **nouvelle branche**. Ne pas continuer sur une branche déjà mergée.
- Messages de commit **en français**, une ligne de titre + une liste de ce qui change.

## 🛠️ Stack et commandes

- Nuxt 4, Vue 3, `<script setup>` en JavaScript (pas de TypeScript). CSS simple, scopé dans les composants.
- `npm run dev` : serveur de développement
- `npm run generate` : site statique dans `.output/public` (c'est ce qu'on mesure avec EcoIndex)

### Organisation

| Dossier | Contenu |
|---|---|
| `app/pages/` | Les pages |
| `app/components/` | Un composant Vue par composant Figma, **avec le même nom** |
| `app/data/` | Le contenu (données fictives pour l'instant) |
| `app/assets/css/main.css` | Variables du design system (couleurs, espacements, styles de texte) |
| `public/images/` | Photos sources (converties par Nuxt Image) |

## 🌱 Règles d'écoconception

- **Images** : toujours `<NuxtImg>` avec `format="webp"`, `width` / `height`, `sizes` et `loading="lazy"` (sauf l'image du hero : `preload` + `fetchpriority="high"`).
  - ⚠️ Dans `sizes`, toujours un préfixe d'écran (`600:50vw`, `sm:100vw`) : la valeur sans préfixe (`100vw`) génère des images de 1×1 px.
  - ⚠️ Le format se règle sur chaque `<NuxtImg>`, pas dans `nuxt.config.js`.
- **SVG** seulement pour les formes simples (logo, carte des cantons). Jamais une photo vectorisée.
- **Le moins de JavaScript possible** : préférer le HTML natif (`<form>`, `<details>`, liens) qui marche sans JS.
- Pas de carrousel, pas de vidéo, pas d'animation inutile, pas de script tiers.
- Utiliser les **variables CSS** de `main.css`, pas de couleur ou d'espacement en dur.
- Pages liées mais pas encore créées : listées dans `nitro.prerender.ignore` de `nuxt.config.js`. **Retirer une page de cette liste dès qu'elle existe.**

## ♿ Accessibilité

- Un seul `<h1>` par page, titres dans l'ordre.
- Tout ce qui marche à la souris marche aussi au clavier (focus visible).
- Champs de formulaire avec un vrai `<label>`.
- Contrastes WCAG AA (voir DESIGN.md).

## ✅ Avant de dire « c'est fait »

- `npm run generate` passe sans erreur.
- Vérifier le rendu en desktop **et** en mobile (390 px) et le comparer à la maquette Figma.
- Le journal est à jour.
