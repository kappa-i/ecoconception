// Les 7 étapes du questionnaire, dans l'ordre (textes repris des maquettes Figma).
// - label    : texte du compteur « 03 / 07 — Durée du séjour »
// - question : titre de l'étape
// - help     : petite phrase grise sous le titre
// - options  : réponses proposées (étapes 3 à 7). `meta` = colonne d'infos à droite,
//              le \n fait un retour à la ligne.

export const questionnaireSteps = [
  {
    id: 'depart',
    label: 'Lieu de départ',
    question: 'D’où partez-vous ?',
    help: 'On calcule les trajets en train depuis ce lieu.'
  },
  {
    id: 'destination',
    label: 'Destination',
    question: 'Où aimeriez-vous aller ?',
    help: 'Un ou plusieurs cantons. Les activités et hébergements proposés seront dans cette région.'
  },
  {
    id: 'duree',
    label: 'Durée du séjour',
    question: 'Combien de temps ?',
    help: 'Une journée suffit souvent : pas besoin d’aller loin.',
    options: [
      { value: 'journee', label: 'Une journée,', meta: 'Sans nuitée\nretour le soir' },
      { value: '1-3-nuits', label: '1 à 3 nuits,', meta: 'Week-end, pont\nescapade' },
      { value: '4-nuits-et-plus', label: '4 nuits et +', meta: 'Un lieu de séjour\nune activité par jour' }
    ]
  },
  {
    id: 'hebergement',
    label: 'Hébergement',
    question: 'Besoin d’un hébergement ?',
    help: 'Si non, on n’affiche aucune offre d’hôtel : la page reste plus légère.',
    options: [
      { value: 'oui', label: 'Oui,', meta: 'Proposez-moi des hôtels\nprès des activités' },
      { value: 'non', label: 'Non', meta: 'J’ai déjà où dormir\n(proches, déjà réservé)' }
    ]
  },
  {
    id: 'budget',
    label: 'Budget',
    question: 'Quel budget ?',
    help: 'Par personne, transport compris.',
    options: [
      { value: 'petit', label: 'Petit,', meta: 'Moins de\n100 CHF' },
      { value: 'moyen', label: 'Moyen,', meta: 'De 100 à\n300 CHF' },
      { value: 'confort', label: 'Confort', meta: 'Plus de\n300 CHF' }
    ]
  },
  {
    id: 'avecQui',
    label: 'Avec qui',
    question: 'Avec qui partez-vous ?',
    help: 'Pour proposer des activités adaptées.',
    options: [
      { value: 'seul', label: 'Seul·e,', meta: 'Activités sûres\nen solo' },
      { value: 'couple', label: 'En couple,', meta: 'Escapade\nà deux' },
      { value: 'amis', label: 'Entre amis,', meta: 'Activités\npartagées' },
      { value: 'famille', label: 'En famille', meta: 'Adaptées\naux enfants' }
    ]
  },
  {
    id: 'envies',
    label: 'Envies',
    question: 'Qu’avez-vous envie de faire ?',
    help: 'Facultatif · plusieurs choix possibles.',
    // Mêmes valeurs que les liens « Par envie » de l'accueil (app/data/home.js),
    // pour que ?envie=nature coche directement la bonne réponse.
    options: [
      { value: 'nature', label: 'Nature,', meta: 'Randos, lacs\npanoramas' },
      { value: 'sport', label: 'Sport,', meta: 'Vélo, ski\nescalade' },
      { value: 'culture', label: 'Culture,', meta: 'Musées\nvillages' },
      { value: 'gastronomie', label: 'Gastronomie,', meta: 'Fromages\nvignobles' },
      { value: 'bien-etre', label: 'Bien-être,', meta: 'Bains\nthermaux' },
      { value: 'evenements', label: 'Événements', meta: 'Festivals\nfêtes' }
    ]
  }
]
