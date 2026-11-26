// Contenu de la page d'accueil.
// ⚠️ Données fictives reprises des maquettes : à remplacer par les vraies données.
// Photos retirées pour l'instant (fichiers gardés dans public/images/) :
// pour les remettre, ajouter image: { src, width, height } à chaque activité.

export const envies = [
  { slug: 'nature', word: 'Nature', count: 142 },
  { slug: 'sport', word: 'Sport', count: 87 },
  { slug: 'culture', word: 'Culture', count: 63 },
  { slug: 'gastronomie', word: 'Gastronomie', count: 41 },
  { slug: 'bien-etre', word: 'Bien-être', count: 28 },
  { slug: 'evenements', word: 'Événements', count: 19 }
]

export const activities = [
  {
    slug: 'balade-weggis',
    title: 'Balade autour de Weggis',
    place: 'Lucerne · Lac des Quatre-Cantons',
    facts: ['1 h 30 · 5 km', 'Gratuit']
  },
  {
    slug: 'glacier-morteratsch',
    title: 'Glacier de Morteratsch',
    place: 'Grisons · Engadine',
    facts: ['2 h · 7 km', 'Gratuit']
  },
  {
    slug: 'sentier-eiger',
    title: 'Sentier de l’Eiger',
    place: 'Berne · Oberland bernois',
    facts: ['2 h 30 · 6 km', 'Dès 64 CHF']
  }
]

export const events = [
  { date: '2026-11-22', label: '22 – 23 nov.', title: 'Marché de Noël de Montreux · Vaud' },
  { date: '2026-11-29', label: '29 nov.', title: 'Fête de l’Escalade (cortège) · Genève' },
  { date: '2026-12-06', label: '6 déc.', title: 'Saint-Nicolas, Fribourg · Fribourg' },
  { date: '2026-12-13', label: '13 – 14 déc.', title: 'Marché de Noël de Bâle · Bâle-Ville' }
]

// Codes = noms des calques de la carte SVG (Questionnaire/CantonMap).
export const cantons = {
  AG: { name: 'Argovie', count: 18 },
  AI: { name: 'Appenzell Rhodes-Intérieures', count: 6 },
  AR: { name: 'Appenzell Rhodes-Extérieures', count: 7 },
  BE: { name: 'Berne', count: 41 },
  BL: { name: 'Bâle-Campagne', count: 9 },
  BS: { name: 'Bâle-Ville', count: 14 },
  FR: { name: 'Fribourg', count: 17 },
  GE: { name: 'Genève', count: 19 },
  GL: { name: 'Glaris', count: 8 },
  GR: { name: 'Grisons', count: 38 },
  JU: { name: 'Jura', count: 11 },
  LU: { name: 'Lucerne', count: 22 },
  NE: { name: 'Neuchâtel', count: 13 },
  NW: { name: 'Nidwald', count: 7 },
  OW: { name: 'Obwald', count: 8 },
  SG: { name: 'Saint-Gall', count: 16 },
  SH: { name: 'Schaffhouse', count: 9 },
  SO: { name: 'Soleure', count: 10 },
  SZ: { name: 'Schwytz', count: 12 },
  TG: { name: 'Thurgovie', count: 10 },
  TI: { name: 'Tessin', count: 27 },
  UR: { name: 'Uri', count: 9 },
  VD: { name: 'Vaud', count: 24 },
  VS: { name: 'Valais', count: 35 },
  ZG: { name: 'Zoug', count: 6 },
  ZH: { name: 'Zurich', count: 29 }
}
