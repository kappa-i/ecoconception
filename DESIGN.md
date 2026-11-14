# 🎨 Design — Direction artistique *(en cours)*

> Voir aussi [le concept](CONCEPT.md).

## Typographie

| Usage | Police | Note |
|---|---|---|
| **Titres** | [Venus+](https://facetypes.xyz/venus/), dans l'esprit de *Carrare* | Libre, grotesque expressive |
| **Textes** | **Frutiger** | La typo signalétique suisse, très lisible |

> ⚠️ **Écoconception** : chaque webfont ajoute du poids et des requêtes.
> - Charger **une seule graisse** de Venus+, en `woff2`, **subsetée** aux caractères latins et en `font-display: swap`.
> - Frutiger est sous licence payante. On peut la remplacer par une pile de polices système proche (`"Frutiger", "Segoe UI", "Helvetica Neue", Arial, sans-serif`), ce qui donne **0 Ko** à charger pour le texte courant.

## Style visuel

Trois pistes, qu'on peut combiner :

1. **Affiche suisse** : grands titres en grotesque très gras, une photo de montagne cadrée et beaucoup de blanc. C'est l'esprit *Switzerland Guide* et *Snowline Tour*.
2. **Rubans de texte** : des bandeaux colorés qui serpentent sur l'image, le texte suivant le tracé, dans l'esprit *JOMO JOY*. Ils peuvent servir de fil conducteur, pour évoquer un sentier ou une ligne de train.
3. **Carte postale** : des illustrations vectorielles en aplats de couleur, avec des dégradés doux, façon [La Jonx](https://la-jonx.ch), une par ville ou région. Si possible des dessins SVG car peu couteux en ressource.

**Pourquoi ces choix sont écoconçus :**

- 🖼️ **Des illustrations en SVG plutôt que des photos** : quelques Ko au lieu de plusieurs centaines par image, nettes à toutes les tailles et faciles à mettre en cache.
- 〰️ **Des rubans en SVG** (`<textPath>`) : du vrai texte, accessible et indexable, sans image.
- 📷 **Peu de photos**, réservées aux endroits où elles comptent vraiment, en WebP ou AVIF avec lazy loading.

## Palette *« Switzerland color code »*

> à compléter
