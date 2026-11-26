# 📓 Journal d'implémentation

> Ce qui a été codé, et pourquoi. Voir aussi [le concept](CONCEPT.md) · [le design](DESIGN.md).

## 26.11.2026 — Page d'accueil

Branche `accueil`. Codée à partir de la maquette Figma *Accueil — complète*.

### Structure

| Fichier | Rôle |
|---|---|
| `app/pages/index.vue` | La page : hero, *Par envie*, *Ce week-end*, *Explorer la Suisse*, *Agenda*, pied de page |
| `app/assets/css/main.css` | Fondations du design system en variables CSS : couleurs, espacements, styles de texte |
| `app/data/home.js` | Contenu de la page (envies, activités, agenda, noms des 26 cantons) |
| `app/components/` | Un composant par composant Figma, avec les mêmes noms |

**Composants :** `HomeHero`, `SiteHeader`, `BrandMark`, `LogoMark`, `SectionHeading`, `TextLink`, `EnvieLink`, `ActivityCard`, `CantonMap`, `InfoRow`, `SiteFooter`.

Les sections alternent les fonds (blanc, `bg/muted`, blanc, ink), comme dans DESIGN.md. Les couleurs qui changent sur fond sombre (texte méta, filets) passent par des variables contextuelles (`--ctx-meta`, `--ctx-rule`) redéfinies par `.section--inverse`.

### Ce qui est interactif

- **Hero, variante « question » (CTA=Inline)** : on tape son lieu de départ puis *Commencer*. C'est un formulaire HTML natif (GET), qui **marche sans JavaScript**. Il ouvre `/questionnaire?depart=…&etape=2`, donc le questionnaire commence directement à l'étape 2. La variante bouton reste disponible avec `<HomeHero cta="button" />`.
- **Par envie** : chaque mot mène à `/questionnaire?envie=nature`, etc. Au survol ou au focus, le mot passe en rouge et le filet en noir, sans décaler la mise en page.
- **Cartes d'activité** : toute la carte est cliquable, et le titre se souligne au survol.
- **Carte des cantons** : survol **ou focus clavier** → le canton passe en noir, son nom et son nombre d'activités s'affichent à gauche (annoncés aux lecteurs d'écran). Clic ou Entrée → `/regions/vd`, etc.
- **En-tête mobile** : la navigation passe dans un menu `<details>`, **sans JavaScript**.

### 🌱 Choix d'écoconception

| Choix | Effet |
|---|---|
| **Aucune webfont** | Les polices de la maquette sont en tête de pile (utilisées si installées), sinon police système. 0 Ko de police à charger. |
| **Nuxt Image** (`@nuxt/image`) | Photos converties en **WebP** et déclinées en plusieurs tailles au moment de `nuxt generate`. Le navigateur ne télécharge que la taille adaptée à l'écran. |
| Photo du hero | 175 Ko (JPEG) → **116 Ko** en 1536 px, 20 à 29 Ko sur mobile. Préchargée (`fetchpriority="high"`), car c'est la seule image visible à l'ouverture. |
| Photos des cartes | 66 à 85 Ko (JPEG) → **8 à 11 Ko** en 352 px. Chargées seulement en arrivant à l'écran (`loading="lazy"`). |
| **Carte des cantons allégée** | L'export Figma dessinait chaque canton deux fois (forme + contour masqué). Un seul tracé par canton, contour en CSS : 90 Ko → **42 Ko**, soit **≈16 Ko compressé**. |
| **Logo en SVG inline** | Environ 200 octets, aucune requête. |
| **Voile du hero en CSS** | Le dégradé qui rend le texte lisible est fait en CSS, pas dans l'image. |
| **Site statique** | `nuxt generate` produit du HTML prêt à servir. |

### ♿ Accessibilité

- La phrase d'accroche du hero est le **titre principal (H1)**. Son apparence ne change pas, mais la page a maintenant un vrai H1.
- Champ du hero avec un vrai `<label>`, et formulaire bloqué si le champ est vide.
- Liens texte : zone cliquable agrandie à 44 px sans changer la mise en page.
- Focus clavier visible partout (contour rouge).
- Les animations de survol sont coupées si le système demande moins d'animations.

### ⚠️ Écarts avec la maquette et points ouverts

- **Trait blanc du hero** (calque `Vector 3`) : retiré à la demande. Le fichier `app/assets/hero-trace.svg` est gardé mais pas utilisé.
- **Carte des cantons** : aucun canton n'est sélectionné au chargement, comme le dit la description du composant CantonInfo. La maquette montre Vaud en exemple.
- **« Tout l'agenda »** est souligné comme les autres liens (l'instance Figma avait perdu son soulignement).
- **Rendu des titres** : la police système (Segoe UI sous Windows) remplace Inter, la police de secours des maquettes. Le rendu est donc un peu différent.
- **Données fictives** : nombres d'activités, agenda et nombres par canton sont des exemples.
- **Pages pas encore créées** : questionnaire, activités, régions, recherche, agenda, pages du pied de page et autres langues. Les liens mènent à une 404 pour l'instant. Ils sont exclus du pré-rendu dans `nuxt.config.js` : **à retirer de la liste au fur et à mesure**.
- **Carte en double** : pour rester interactive, la carte est à la fois dans le HTML et dans le JavaScript (≈16 Ko compressés de plus).
- **Nuxt Image** : le format WebP se règle sur chaque `<NuxtImg>` (`format="webp"`), pas dans la config. Les tailles d'écran doivent être écrites avec un préfixe (`600:50vw`) : la notation courte `sizes="100vw"` génère des images de 1×1 px.

### À faire ensuite

- [ ] Questionnaire (pop-up, 7 étapes), qui lit `depart`, `etape` et `envie` dans l'URL
- [ ] Pages résultats et activité
- [ ] Vraies données (activités, cantons, agenda)
- [ ] Mesurer la page (EcoIndex, poids, requêtes) pour le compteur du pied de page
