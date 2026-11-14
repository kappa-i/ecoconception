# 💡 Concept — Suisse Tourisme écoconçu

> Synthèse de la recherche et de la réflexion menées dans le [FigJam du projet](https://www.figma.com/board/NkXLpSkvFgUfcKtHzAuUvz/%C3%89coconception).

## 🎯 But : trouver une activité

Tout le site est construit autour d'un seul objectif : **amener l'utilisateur à une activité qui lui correspond, en un minimum d'étapes**.

**Public visé : un tourisme suisse par les Suisses.** On vise les résidents qui voyagent en Suisse plutôt que les touristes étrangers, parce que c'est moins polluant et que ça encourage à rester dans le pays (suggestion du prof).

## 🧭 Parcours

```
Écran d'accueil  ──▶  Pop-up questionnaire  ──▶  Résultats  ──▶  Page activité
```

### 1. Écran d'accueil

- **Le hero** : *« Organisez votre prochain séjour »*, avec le bouton qui ouvre le questionnaire.
- **Une carte par zone**, en SVG léger plutôt que la carte 3D interactive du site actuel.
- **Quelques chiffres clés** sur la Suisse.
- **Les prochaines manifestations**, filtrables par canton.

### 2. Pop-up questionnaire ⭐

C'est **la grande idée du projet**, inspirée de [Naboo](https://www.naboo.app/fr-ch). Au lieu de naviguer de page en page, de catégorie en sous-catégorie et de filtre en filtre, l'utilisateur répond à **quelques questions courtes, une par écran**, et arrive **directement sur les résultats**.

| # | Question | Réponses |
|---|---|---|
| 1 | **Lieu** | Région, canton, ou lieu de départ |
| 2 | **Durée** | Une journée · 1 à 3 nuits · 4 nuits et plus, flexible ou non |
| 3 | **Tarif** | Fourchette de budget |
| 4 | **Type de voyage** | Seul·e, en couple, entre amis, en famille… |
| 5 | **Type d'activité** *(optionnel)* | Nature · Sport · Culture · Gastronomie · Bien-être · Événements |

**Côté interface :**

- Une question par écran, avec une barre de progression.
- Des boutons *Retour* et *Suivant*.
- Des choix en grands boutons cliquables plutôt qu'en menus déroulants.

### 3. Résultats

Les résultats sont filtrés selon les réponses et regroupés par région :

- les **activités** ;
- les **hébergements** ;
- les **événements de la région**.

### 4. Page activité

Le détail d'une activité et les infos pratiques : accès en transports publics, durée, prix, saison.

## 🌱 Pourquoi c'est écoconçu

- 📉 **Moins de pages vues** : le parcours passe de *accueil → catégorie → sous-catégorie → filtres → résultats* à *questionnaire → résultats*. Moins de pages, c'est moins de requêtes, de données transférées et de temps d'écran.
- 🪶 **Un questionnaire très léger** : du texte et des boutons, sans image ni carte à charger entre les étapes.
- ⚡ **Pas de rechargement entre les questions** : les réponses sont gérées côté client, et une seule requête part pour les résultats.
- 🎯 **Des résultats ciblés** : on n'affiche que ce qui correspond, au lieu de longues listes à faire défiler.
- 🗺️ **Une carte SVG** plutôt qu'une carte 3D interactive de toute la Suisse.
- 🧭 **Ça répond aux pain points des personas** : décider vite (Lucie), comparer peu d'options adaptées (Camille), ne pas se perdre dans des pages trop animées (Jean-Pierre).

## 🔝 Navigation

| Élément | Rôle |
|---|---|
| Logo | Revenir à l'accueil |
| Activités | Explorer par type : nature, sport, culture, gastronomie, bien-être… |
| Recherche | Trouver directement une activité ou un lieu |
| FR / DE / IT / EN | Changer de langue |

> Pistes encore ouvertes dans le FigJam : un onglet **Voyage surprise** et un onglet **Explorer la Suisse** (par canton ou région, avec la carte), ce dernier étant surligné en rouge.

## 🔍 Constats sur le site actuel

| Problème | Ce qu'on propose |
|---|---|
| **75 % des requêtes sont des images**, et les images sont animées | Formats modernes, tailles adaptées, lazy loading, moins d'images |
| Carte 3D interactive de toute la Suisse : lourde et déroutante | Carte SVG statique, découpée par canton |
| Agent IA activé d'office : prend de la place, fait du bruit, peut inspirer de la méfiance | Bouton sticky, l'IA seulement à la demande |
| Navbar très longue, filtres nombreux et lourds | Sous-catégories regroupées dans la page plutôt que dans la navbar |
| DOM trop complexe | Structure de pages simplifiée |
| Beaucoup de langues et des intégrations Snapchat / TikTok | Limiter les scripts tiers |
| Cookies sans vrai choix | Consentement conforme |

**Les recommandations EcoIndex à suivre :**

- Optimiser les images
- Éviter les vidéos
- Compresser les fichiers
- Penser mobile first
- Éviter le scroll infini et les carrousels
- Limiter widgets et plugins
- Utiliser des polices système
- Préférer les pages statiques

## 👥 Personas

| | Profil | Format | Besoin clé |
|---|---|---|---|
| **Lucie**, 24 ans | Étudiante à Martigny, voyage seule, smartphone avec peu de data | Sortie à la journée | Décider vite, venir en train, connaître le budget total, consulter hors ligne |
| **Camille**, 32 ans | Employée à 80 % à Lausanne, en couple | 1 à 3 nuits | Comparer quelques idées selon le trajet, les activités et le budget |
| **Jean-Pierre**, 67 ans | Retraité à Zoug, voyage en train avec un AG, hors saison | 4 à 6 nuits, un seul lieu | Un lieu bien desservi, des activités faciles autour, des pages lisibles avec peu d'animations |

**Données utilisées (OFS / STnet) :**

- Les résidents font en moyenne **7,9 sorties sans nuitée** par an.
- Les courts séjours de 1 à 3 nuits (~0,6 par an) sont plus fréquents que ceux de 4 nuits ou plus (~0,4).
- **44 % des touristes étrangers** visitent deux destinations ou plus.

## 💬 Arguments pour convaincre

- ⚡ **Performance** : un site plus léger et plus rapide convertit mieux et perd moins de visiteurs.
- 💰 **SEO et coûts** : moins de bande passante, de stockage et d'hébergement.
- ♿ **Accessibilité** : le site fonctionne aussi sur de vieux téléphones et avec des connexions lentes.
- 🛠️ **Maintenance** : moins de dépendances, donc moins de dette technique.

**Pour prouver l'impact :**

- Tests utilisateurs sur le site actuel, puis sur notre prototype
- A/B testing
- Mesures avant / après avec EcoIndex, Website Carbon et PageSpeed

## 🗂️ Avancement

- [x] Analyse du site existant
- [x] Choix du projet et du concept
- [x] Personas
- [ ] Parcours utilisateur clé *(Cindy & Léa)* · 🔴 high
- [ ] Userflow à partir du parcours *(Léa)*
- [ ] Maquettes desktop · 🟠 medium
- [ ] Maquettes mobile
- [ ] Contenu par page, avec la justification de chaque choix · 🟠 medium
- [ ] Carte SVG et code
- [ ] Architecture du code (Next.js)
- [ ] Rapport

> Les maquettes servent à coder, pas besoin de prototype cliquable : le rendu interactif se fera directement en Next.js.
