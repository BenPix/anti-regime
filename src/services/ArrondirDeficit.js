export default function(perte) {
  // on arrondit à la centaine pour les besoins des graphiques de déficit
  perte = Math.round(perte / 100) * 100;
  // valeur arrondie à 100 au minimum pour être cohérent
  if (perte === 0) {
    perte = 100;
  }

  return perte;
}
