# 📓 Journal d'implémentation

> Ce qui a été codé, et pourquoi. Voir aussi [le concept](CONCEPT.md) · [le design](DESIGN.md).

## 26.11.2026 — Questionnaire (pop-up en 7 étapes)

Branche `questionnaire`. Codé à partir de la rangée *Parcours — 02 à 08* de la page *Écrans* (Figma). Un commit par étape.

### Comment ça marche

- **Ouverture** : le pop-up s'ouvre quand l'adresse contient `?questionnaire`. Tous les points d'entrée y mènent :
  - le formulaire du hero : `/?questionnaire&depart=Lausanne&etape=2`, donc on arrive directement à l'étape 2 ;
  - les liens *Par envie* : `/?questionnaire&envie=nature`, l'envie est déjà cochée à l'étape 7 ;
  - le lien *Organiser mon séjour* de l'en-tête ;
  - un clic sur un canton de la carte *Explorer la Suisse* : `/?questionnaire&canton=VD`. La destination est alors déjà connue, donc **les deux premières questions sont inversées** : d'abord *Où aimeriez-vous aller ?* (le canton est déjà coché, on peut en ajouter), puis *D'où partez-vous ?*.
- **Fermeture** : *Fermer*, la touche Échap ou le bouton Retour du navigateur.
- **`<dialog>` natif** : le navigateur gère lui-même le focus, la touche Échap et le fond assombri. Aucune librairie de modale.
- **Les réponses restent dans le navigateur** pendant tout le questionnaire (un objet `answers` dans `QuestionnaireModal.vue`). **Aucune requête entre les étapes** : une seule à la fin, vers la page résultats, avec toutes les réponses dans l'adresse.

### Fichiers

| Fichier | Rôle |
|---|---|
| `app/components/QuestionnaireModal.vue` | Le pop-up : affiche, progression, question, *Retour* / *Suivant*. Garde toutes les réponses et choisit l'étape à afficher. |
| `app/components/QuestionnaireProgress.vue` | Les 7 segments et le compteur « 02 / 07 — Destination ». |
| `app/components/QuestionnaireStepDepart.vue` · `QuestionnaireStepDestination.vue` | Les réponses des étapes 1 et 2 (champ, carte), qui ont une forme à part. |
| `app/components/QuestionnaireChoices.vue` · `QuestionnaireAnswer.vue` | La liste de grandes réponses des étapes 3 à 7. |
| `app/data/questionnaire.js` | Les textes des 7 étapes : questions, aides, réponses. |
| `app/data/gares.js` | 19 grandes gares avec leurs coordonnées (pour « Utiliser ma position »). |

### Étapes

**1. Lieu de départ** (`QuestionnaireStepDepart.vue`)
- Champ *Ville ou gare*, pré-rempli si on vient du hero. Le focus est mis dedans à l'ouverture.
- *Utiliser ma position* : la position GPS est comparée aux 19 gares de `gares.js`, **directement dans le navigateur**. On n'appelle aucun service de géolocalisation externe (pas de requête, pas de données envoyées à un tiers).
- *Suivant* reste désactivé tant que le champ est vide. La touche Entrée passe à l'étape suivante.

**2. Destination** (`QuestionnaireStepDestination.vue`)
- Carte des 26 cantons : on clique sur un ou plusieurs cantons (survol en gris moyen, choisi en noir). Un deuxième clic enlève le canton.
- Sous la carte : les cantons choisis (« Grisons, Berne, Lucerne ») ou une aide.
- **Sur ordinateur**, le nom du canton survolé s'affiche dans une petite étiquette noire qui suit la souris. Elle est masquée sur les écrans tactiles (`@media (hover: none)`), où il n'y a pas de survol.
- *Peu importe, surprenez-moi* : vide la sélection et passe directement à l'étape suivante.
- La carte est dessinée avec Vue à partir du même fichier `cantons.svg` que l'accueil (lu ligne par ligne). Pas de nouveau fichier à télécharger.
- *Suivant* reste désactivé tant qu'aucun canton n'est choisi (ou *Peu importe*).

**3. Durée** (avec `QuestionnaireChoices.vue` et `QuestionnaireAnswer.vue`)
- *Une journée*, *1 à 3 nuits*, *4 nuits et +*, en grande liste typographique (composant Figma *Answer*) : gris par défaut, gris foncé au survol, noir quand choisi. Colonne d'infos à droite.
- Les étapes 3 à 7 ont toutes cette forme : un seul composant `QuestionnaireChoices` affiche la liste (un seul choix, ou plusieurs pour l'étape 7), au lieu de répéter le même code dans 5 fichiers.
- Les textes des 7 étapes (questions, aides, réponses) sont rangés dans `app/data/questionnaire.js`, séparés du code.

**4. Hébergement**
- *Oui* (proposez-moi des hôtels) ou *Non* (j'ai déjà où dormir).
- **Question sautée pour « Une journée »** : pas de nuit, donc pas d'hôtel. Le compteur passe alors de 7 à 6 étapes (`visibleSteps` dans `QuestionnaireModal.vue`).
- La réponse n'est envoyée aux résultats que si la question a été posée. Sans *Oui*, la page résultats n'affichera aucun hôtel.

**5. Budget**
- *Petit* (moins de 100 CHF), *Moyen* (100 à 300 CHF), *Confort* (plus de 300 CHF), par personne, transport compris.

**6. Avec qui**
- *Seul·e*, *En couple*, *Entre amis*, *En famille*, pour proposer des activités adaptées.

**7. Envies**
- *Nature*, *Sport*, *Culture*, *Gastronomie*, *Bien-être*, *Événements* : **plusieurs choix possibles** (cases à cocher), et l'étape est **facultative**.
- Si on vient d'un lien *Par envie* de l'accueil, l'envie est déjà cochée (mêmes valeurs que dans `home.js`).
- Le bouton devient **Voir les activités** et envoie toutes les réponses à la page résultats, en une seule fois, dans l'adresse :
  `/resultats?depart=Lausanne&cantons=GR,BE&duree=1-3-nuits&hebergement=oui&budget=moyen&avecQui=couple&envies=nature,culture`

### 🌱 Choix d'écoconception

| Choix | Effet |
|---|---|
| Pop-up sur la page d'accueil | Pas de nouvelle page à charger pour commencer le questionnaire. |
| Aucune requête entre les étapes | Tout se passe dans le navigateur, une seule requête à la fin. |
| Affiche en WebP | 69 Ko (JPEG) → **34 Ko**. Chargée seulement à l'ouverture du pop-up, puis gardée pour toutes les étapes. |
| Pas d'affiche sur mobile | Masquée, et grâce à `loading="lazy"` le navigateur ne la télécharge même pas. |
| Gare la plus proche calculée localement | Aucun appel à une API de géolocalisation. |
| Hébergement seulement si utile | Pour une journée, la question n'est pas posée. Avec *Non*, aucune offre d'hôtel ne sera chargée : ni API de réservation, ni widget tiers (parmi les scripts les plus lourds d'un site touristique). |
| Carte SVG réutilisée | La carte de la destination vient du même fichier que celle de l'accueil (≈16 Ko compressé), au lieu d'une carte 3D interactive. |

### ♿ Accessibilité

- `<dialog>` : le focus reste dans le pop-up, Échap le ferme.
- La question de chaque étape est un titre `<h2>` qui sert de nom au pop-up pour les lecteurs d'écran.
- Champ avec un vrai `<label>`. Les messages de « Utiliser ma position » sont annoncés (`aria-live`).
- Carte : chaque canton est une **case à cocher** pour les lecteurs d'écran (`role="checkbox"`, nom du canton, coché ou non). Au clavier : Tab pour passer d'un canton à l'autre, Espace ou Entrée pour cocher. Le canton qui a le focus est entouré en rouge, **au clavier seulement** : au clic, le navigateur n'affiche plus de cadre rectangulaire autour du canton (idem sur la carte de l'accueil).
- Réponses : ce sont de vrais boutons radio (ou cases à cocher), cachés visuellement. Flèches du clavier pour changer de réponse, et la réponse qui a le focus est entourée en rouge.
- À chaque changement d'étape, le **focus va sur la nouvelle question** : un lecteur d'écran l'annonce tout de suite.

### ⚠️ Écarts avec la maquette et points ouverts

- **Affiche en `<img>` et pas en `<NuxtImg>`** : le pop-up n'existe que dans le navigateur, donc Nuxt Image ne voyait pas l'image pendant `nuxt generate` (elle aurait été en 404). Le WebP a été converti une fois avec `sharp` et rangé dans `public/images/`.
- **Compteur des étapes 6 et 7** : la maquette affiche « Durée du séjour » (copier-coller). Le code affiche *Avec qui* et *Envies*.
- **« Voir les 12 activités »** dans la maquette : le code affiche *Voir les activités*, car il n'y a pas encore de vraies données pour compter les résultats.
- **Mobile** : le pop-up passe en plein écran, sans l'affiche, et les réponses passent de 56 à 40 px.
- **Sans JavaScript**, le pop-up ne peut pas s'ouvrir.
- `/resultats` n'existe pas encore (ajouté à `nitro.prerender.ignore`) : *Voir les activités* mène pour l'instant à une 404.

### À faire ensuite

- [ ] Page résultats, qui lit les réponses dans l'adresse (et n'affiche *Où dormir* que si `hebergement=oui`)
- [ ] Tester le questionnaire avec un lecteur d'écran (NVDA ou VoiceOver)

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

- [x] Questionnaire (pop-up, 7 étapes), qui lit `depart`, `etape` et `envie` dans l'URL *(voir l'entrée « Questionnaire »)*
- [ ] Pages résultats et activité
- [ ] Vraies données (activités, cantons, agenda)
- [ ] Mesurer la page (EcoIndex, poids, requêtes) pour le compteur du pied de page
