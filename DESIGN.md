# 🎨 Design — Direction artistique *(en cours)*

> Voir aussi [le concept](CONCEPT.md) · 🎨 [Design system Figma](https://www.figma.com/design/gb6WVkatyGXDzLrQVkjZWG)

## Typographie

| Usage | Police | Note |
|---|---|---|
| **Titres** | [Venus+ Carrare](https://facetypes.xyz/venus/) | Libre, grotesque expressive |
| **Textes** | **Frutiger** | La typo signalétique suisse, très lisible |

> ⚠️ **Écoconception** : chaque webfont ajoute du poids et des requêtes.
> - Charger **une seule graisse** de Venus+ Carrare (*Regular*), en `woff2`, **subsetée** aux caractères latins et en `font-display: swap`.
> - Frutiger est sous licence payante. On peut la remplacer par une pile de polices système proche (`"Frutiger", "Segoe UI", "Helvetica Neue", Arial, sans-serif`), ce qui donne **0 Ko** à charger pour le texte courant.

## Style visuel

### ✅ Direction retenue : éditorial alpin (réf. *Snowline Tour*)

Voir la page *Direction* du Figma.

- 📷 **Une vraie photo par écran**, traitée en **duotone bleu glacier**.
- 🔠 **Une grotesque graisse moyenne**, très grande, serrée, posée sur le bord de la photo.
- ⚪ **Une hiérarchie par le gris** : les options non choisies sont en gris clair, l'option choisie en noir.
- 📑 **Une petite colonne d'infos alignée à droite**, à la manière des dates de Snowline.
- 🔗 **Des liens texte sobres** (*Retour*, *Suivant →*) à la place des boutons pilules. Aucune illustration ni aplat décoratif.

**Pourquoi c'est écoconçu :**

- **Une seule photo par écran**, en WebP. Le duotone se compresse mieux qu'une photo en couleur : l'Eiger passe de 570 Ko à **≈117 Ko** en 1600 px.
- **La typographie porte le design**, ce qui ne coûte presque rien à charger.
- ⚠️ **Une photo vectorisée en SVG n'est pas une bonne idée.** Le test sur le lac d'Uri donne 1,8 Mo en SVG (580 Ko compressé) contre **49 Ko en WebP**. Le SVG est réservé aux formes simples : logo, pictos, carte des cantons.

### 💭 Pistes pour plus tard

Ces pistes ne sont pas abandonnées. Si on les reprend, ce sera dans le style éditorial, pas en aplats façon clipart.

- **Rubans de texte** : des bandeaux qui serpentent sur la photo, le texte suivant le tracé (`<textPath>`), dans l'esprit *JOMO JOY*. Ils pourraient servir de fil conducteur, en évoquant un sentier ou une ligne de train.
- **Carte postale** : une carte par région, façon [La Jonx](https://la-jonx.ch).

## Palette

Couleurs tirées du FigJam : la palette *Switzerland color code*, plus les palettes *Swiss Alps* et *Swiss Red / Powder White*.

| Variable | Hex | Source |
|---|---|---|
| `red/alps` | `#E22424` | Swiss Alps |
| `red/swiss` | `#D62B1F` | Swiss Red |
| `red/flag` | `#A32A2E` | Switzerland color code |
| `yellow/sun-valley` | `#F2D079` | Sun Valley |
| `blue/sky` | `#A4C5F3` | Switzerland color code |
| `blue/glacier` | `#CEE0F1` | Switzerland color code |
| `blue/lake` | `#506282` | Switzerland color code |
| `blue/summit` | `#4C5F6B` | Summit |
| `green/meadow` | `#A8BD6B` | Switzerland color code |
| `green/fir` | `#4C6022` | Switzerland color code |
| `neutral/powder` | `#F0F4F7` | Powder White |
| `neutral/tundra` | `#EFEBEA` | Tundra |
| `neutral/white` | `#FFFFFF` | *ajout : fond* |
| `neutral/stone` | `#D5D9DE` | *ajout : bordures* |
| `neutral/rule` | `#E3E6EA` | *ajout : filets* |
| `neutral/grey-300` | `#BDC2CA` | *ajout : options non choisies* |
| `neutral/grey-500` | `#9AA0A9` | *ajout : texte méta* |
| `neutral/ink` | `#1C1F23` | *ajout : texte* |

**Rôles principaux** (variables sémantiques dans Figma) :

- **Fond** : `white` par défaut, `powder` pour les sections alternées.
- **Texte** : `ink` pour le texte principal, `summit` pour le secondaire, `grey-500` pour le méta.
- **Hiérarchie** : `grey-300` pour les options non choisies, `ink` pour l'option choisie.
- **Action principale** : bouton `ink`, qui passe à `red/swiss` au survol.
- **Accents de catégorie** (texte `Meta` en *Accent*, jamais en aplat) : `fir` / `meadow` pour la nature, `sky` pour les lacs, `glacier` pour la neige, `sun-valley` pour le soleil, `alps` pour la culture.

> La couleur reste rare : la photo duotone et la typographie portent le design, ce qui allège les pages et garde un bon contraste.

## Design system (Figma)

Avancement :

- [x] **Fondations** :
  - variables de couleur (primitives + sémantiques) ;
  - espacements (4 → 64) ;
  - rayons (0 → 24) ;
  - 11 styles de texte, avec la famille de police liée aux variables `font/heading` et `font/body`.
- [x] **Composants** (page *Composants*), adaptés à la direction éditoriale :
  - `Button` : **Primary** (bouton plein noir à angles droits, rouge au survol : Suivant, Commencer, Voir les activités), **Secondary** (bouton contour : Retour), **Link** (lien texte souligné : Voir, Modifier mes réponses…) et **Back** (lien texte gris : Fermer, Peu importe…), avec les états Default, Hover et Disabled. **Aucune flèche décorative** ;
  - `Answer` : la réponse du questionnaire en grande liste typographique, avec une colonne méta à droite. Elle est gris clair par défaut, gris moyen au survol et noire quand elle est sélectionnée ;
  - `Progress` : 7 segments fins avec le compteur « 02 / 07 — étape ». Si l'étape hébergement est sautée, le compteur passe à 6 (géré en code) ;
  - `Meta` : le petit texte d'info, en Muted, Strong ou Accent. Il remplace les tags pilules.
- [x] **Écran Direction** reconstruit à partir de ces composants.
- [x] **Composants pour les pages suivantes** :
  - `Logo/Mark` : un carré rouge avec la croix suisse, en SVG (environ 300 octets) ;
  - `Header v2` : deux mises en page, **Double** (logo et accroche, navigation, colonne de droite avec les langues et le CTA, alignée sur la colonne d'infos) et **Compact** (tout sur une ligne). Chacune existe **sur photo** et **sur fond clair**, avec en plus une version **Mobile** (« Menu » en `<details>` HTML, sans JS). La page active est en plein, les autres liens en gris. Le CTA *Organiser mon séjour →* ouvre directement le questionnaire ;
  - `Footer` : la marque, les crédits photo (obligatoires avec les licences CC), les liens et le **compteur écoconception** (poids de la page, CO₂e, score EcoIndex, nombre de requêtes). Les valeurs sont à mesurer réellement ;
  - `Field` : champ de saisie éditorial (petit label gris, valeur en grand, filet en bas), avec les états Empty, Focus et Filled ;
  - `ActivityCard` : carte d'activité avec une photo en duotone (65 à 85 Ko), un titre et deux colonnes d'infos (lieu et accès en gris, durée et prix en noir). Au survol, le titre est souligné.
- [x] **`Questionnaire`** : le pop-up, avec 7 variantes (`Step=1…7`). À gauche, **la même photo pour toutes les étapes, identique à celle du Hero** : elle est déjà en cache, donc le questionnaire ne charge aucune image. À droite :
  - la progression et le lien *Fermer* ;
  - la question et une aide ;
  - les réponses en liste typographique (`Answer`, nouvelle taille **Medium**, 56 px) ;
  - *Retour* et *Suivant*.

  Les 7 étapes sont : 1. lieu de départ (champ + *Utiliser ma position*), **2. destination** (carte SVG des cantons, choix multiple, *Peu importe, surprenez-moi*), 3. durée, **4. hébergement** (posée seulement si des nuits sont prévues), 5. budget, 6. avec qui, 7. envies (facultatif, plusieurs choix possibles, CTA *Voir les 12 activités →*). Les réponses sont gérées côté client et **une seule requête** part à la fin.
- [x] **Aperçu Pop-up** (page *Direction*) : l'accueil assombri, avec le pop-up ouvert par-dessus.
- [x] **Aperçu Résultats** (page *Composants*) : la page résultats montée uniquement à partir d'instances.
- [x] **Parcours complet** : 6 composants de plus.
  - `Hero` : l'accueil, avec la photo, l'en-tête Double, l'intro et le titre géant posé sur le bord.
  - `CantonMap` : les 26 cantons en SVG, chacun nommé par son code (VD, GR…). On passe de 361 Ko pour le fichier source Wikimedia à **≈49 Ko, soit 16 Ko compressé**. États : défaut, survol et sélectionné, par surcharge de remplissage sur l'instance.
  - `ResultsHeader` : le nombre d'activités, le résumé des réponses et *Modifier mes réponses*.
  - `ActivityHero` : la photo, l'en-tête Compact, le fil d'Ariane, le titre géant et les faits clés.
  - `InfoRow` et `InfoTable` : les infos pratiques (accès, durée, distance, niveau, saison, prix, réservation).
  - `TrainAccess` : la durée en train depuis le lieu de départ, l'itinéraire, la comparaison CO₂ train / voiture et le lien vers l'horaire CFF.
- [x] **`HotelRow`** et la section **« Où dormir »** des résultats. Elle n'est affichée **que si l'on a répondu « Oui » à l'hébergement**. C'est une liste texte, sans photo ni widget de réservation, avec un lien direct vers le site de l'hôtel. Aucune API de plateforme de réservation n'est appelée.
- [x] **Rangée *Parcours*** (page *Écrans*), dans l'ordre du prototype : 01 Accueil → 02–08 Questionnaire 1/7 à 7/7 → 09 Résultats → 10 Activité.
- [x] **Page *Écrans*** : l'*Accueil* (héros, « Explorer la Suisse » avec la carte, pied de page) et la *Page activité* (héros, texte d'intro, infos pratiques, accès en train et carte avec le canton en surbrillance, pied de page).
- [x] **Résultats en vue liste** (`Parcours — 09b`, à comparer avec la grille `09`) : toutes les activités **au même niveau**, en liste typographique (`ActivityListRow`). Il n'y a pas d'activité mise en avant, pour ne pas pousser vers le premier résultat. Chaque ligne indique la région, la durée et le **prix**. **Aucune image au chargement**, la vignette n'apparaît qu'au survol. L'en-tête affiche seulement le nombre d'activités et un bouton *Modifier mes choix*. Le **train n'est mentionné que sur la page activité**.
- [x] **Page activité enrichie** :
  - `SeasonBar` : les 12 mois, mois ouverts en noir ;
  - « Votre journée type » avec `TimelineRow` : horaires de train depuis le lieu de départ, et le dernier train utile ;
  - « Infos utiles » : équipement, accessibilité, enfants, et un lien vers MétéoSuisse plutôt qu'un widget météo ;
  - « À combiner avec » : des activités proches, en liste typographique.
- [ ] Composants suivants : KeyFigure, EventRow, FilterBar, NearbyList, SearchOverlay, SaveLink, CookieNotice, Breadcrumb…

> **Polices dans Figma**, pilotées par des variables (collection *Typography*) :
> - `font/heading` = famille des titres (*Venus+ Carrare*) et `font/heading-weight` = *Regular* ;
> - `font/body` = famille du texte (*Frutiger*), avec `font/body-regular`, `font/body-medium` et `font/body-strong` pour les graisses.
>
> Venus+ Carrare et Frutiger doivent être **installées localement** par chaque membre de l'équipe (Venus+ est gratuite sur facetypes.xyz). En attendant, *Inter* sert de police de secours.
