# 📓 Journal d'implémentation

> Ce qui a été codé, et pourquoi. Voir aussi [le concept](CONCEPT.md) · [le design](DESIGN.md).

## 26.11.2026 — Questionnaire (pop-up en 7 étapes)

Branche `questionnaire`. Codé à partir de la rangée *Parcours — 02 à 08* de la page *Écrans* (Figma). Un commit par étape.

### Comment ça marche

- **Ouverture** : le pop-up s'ouvre quand l'adresse contient `?questionnaire`. Tous les points d'entrée y mènent :
  - le formulaire du hero : `/?questionnaire&depart=Lausanne&etape=2`, donc on arrive directement à l'étape 2 ;
  - les liens *Par envie* : `/?questionnaire&envie=nature`, l'envie est déjà cochée à l'étape 7 ;
  - le lien *Organiser mon séjour* de l'en-tête.
- **Fermeture** : *Fermer*, la touche Échap ou le bouton Retour du navigateur.
- **`<dialog>` natif** : le navigateur gère lui-même le focus, la touche Échap et le fond assombri. Aucune librairie de modale.
- **Les réponses restent dans le navigateur** pendant tout le questionnaire (un objet `answers` dans `QuestionnaireModal.vue`). **Aucune requête entre les étapes** : une seule à la fin, vers la page résultats, avec toutes les réponses dans l'adresse.

### Fichiers

| Fichier | Rôle |
|---|---|
| `app/components/QuestionnaireModal.vue` | Le pop-up : affiche, progression, question, *Retour* / *Suivant*. Contient le tableau des 7 étapes (textes des questions) et toutes les réponses. |
| `app/components/QuestionnaireProgress.vue` | Les 7 segments et le compteur « 02 / 07 — Destination ». |
| `app/components/QuestionnaireStep….vue` | Un composant par étape, qui ne contient que les réponses de l'étape. |
| `app/data/gares.js` | 19 grandes gares avec leurs coordonnées (pour « Utiliser ma position »). |

### Étapes

**1. Lieu de départ** (`QuestionnaireStepDepart.vue`)
- Champ *Ville ou gare*, pré-rempli si on vient du hero. Le focus est mis dedans à l'ouverture.
- *Utiliser ma position* : la position GPS est comparée aux 19 gares de `gares.js`, **directement dans le navigateur**. On n'appelle aucun service de géolocalisation externe (pas de requête, pas de données envoyées à un tiers).
- *Suivant* reste désactivé tant que le champ est vide. La touche Entrée passe à l'étape suivante.

### 🌱 Choix d'écoconception

| Choix | Effet |
|---|---|
| Pop-up sur la page d'accueil | Pas de nouvelle page à charger pour commencer le questionnaire. |
| Aucune requête entre les étapes | Tout se passe dans le navigateur, une seule requête à la fin. |
| Affiche en WebP | 69 Ko (JPEG) → **34 Ko**. Chargée seulement à l'ouverture du pop-up, puis gardée pour toutes les étapes. |
| Pas d'affiche sur mobile | Masquée, et grâce à `loading="lazy"` le navigateur ne la télécharge même pas. |
| Gare la plus proche calculée localement | Aucun appel à une API de géolocalisation. |

### ♿ Accessibilité

- `<dialog>` : le focus reste dans le pop-up, Échap le ferme.
- La question de chaque étape est un titre `<h2>` qui sert de nom au pop-up pour les lecteurs d'écran.
- Champ avec un vrai `<label>`. Les messages de « Utiliser ma position » sont annoncés (`aria-live`).

### ⚠️ Écarts avec la maquette et points ouverts

- **Affiche en `<img>` et pas en `<NuxtImg>`** : le pop-up n'existe que dans le navigateur, donc Nuxt Image ne voyait pas l'image pendant `nuxt generate` (elle aurait été en 404). Le WebP a été converti une fois avec `sharp` et rangé dans `public/images/`.
- **Compteur des étapes 6 et 7** : la maquette affiche « Durée du séjour » (copier-coller). Le code affiche *Avec qui* et *Envies*.
- **Sans JavaScript**, le pop-up ne peut pas s'ouvrir.
- `/resultats` n'existe pas encore (ajouté à `nitro.prerender.ignore`).

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
