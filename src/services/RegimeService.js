import data from "../assets/rapportDeficitPoidsDuree";

// trouve la durée pour un régime en fonction du choix du déficit calorique
// et de la perte de poids visée. Résultat retourné en semaines (max 156)
export function dureeRegime(deficitCalorique, pertePoidsVisee) {
  let result;

  switch (deficitCalorique) {
    case 0:
      // pour éviter un résultat de 0 si les calories arrondies font 0 (cad < 50Kcal)
      result = data.cal100[pertePoidsVisee] ?? 156;
      break;
    case 100:
      result = data.cal100[pertePoidsVisee] ?? 156;
      break;
    case 200:
      result = data.cal200[pertePoidsVisee] ?? 156;
      break;
    case 300:
      result = data.cal300[pertePoidsVisee] ?? 156;
      break;
    case 400:
      result = data.cal400[pertePoidsVisee] ?? 156;
      break;
    case 500:
      result = data.cal500[pertePoidsVisee] ?? 156;
      break;
    case 600:
      result = data.cal600[pertePoidsVisee] ?? 156;
      break;
    case 700:
      result = data.cal700[pertePoidsVisee] ?? 156;
      break;
    case 800:
      result = data.cal800[pertePoidsVisee] ?? 156;
      break;
    case 900:
      result = data.cal900[pertePoidsVisee] ?? 156;
      break;
    case 1000:
      result = data.cal1000[pertePoidsVisee] ?? 156;
      break;

    default:
      result = 0;
      break;
  }

  return result;
}

// trouve les besoins caloriques en fonction des données du user, et du poids ciblé
export function besoinCalorique(userData, weight = null) {
  const poidsCible = weight || userData.goalWeight;
  const coefSexe = userData.sexe === "M" ? 5 : -16;
  const age = parseInt(
    (Date.now() - new Date(userData.naissance)) / 31557600000
  );

  return parseInt(
    (userData.activitePhysiqueBase +
      0.02 * userData.activiteFaible +
      0.04 * userData.activiteMoyenne +
      0.06 * userData.activiteForte) *
      (9.99 * poidsCible + 6.25 * userData.taille - 4.92 * age + coefSexe)
  );
}

// détermine la perte calorique minimale pour un user et un poids visé
// correspond à la différence entre les besoins caloriques du poids actuel et visé
export function perteCaloriqueMinimale(userData, poids) {
  const coefSexe = userData.sexe === "M" ? 5 : -16;
  const age = parseInt(
    (Date.now() - new Date(userData.naissance)) / 31557600000
  );

  const calStart = parseInt(
    (userData.activitePhysiqueBase +
      0.02 * userData.activiteFaible +
      0.04 * userData.activiteMoyenne +
      0.06 * userData.activiteForte) *
      (9.99 * userData.poids + 6.25 * userData.taille - 4.92 * age + coefSexe)
  );

  const calEnd = parseInt(
    (userData.activitePhysiqueBase +
      0.02 * userData.activiteFaible +
      0.04 * userData.activiteMoyenne +
      0.06 * userData.activiteForte) *
      (9.99 * poids + 6.25 * userData.taille - 4.92 * age + coefSexe)
  );

  return calStart - calEnd;
}

// détermine la perte calorique maximale pour un user
// correspond à 25% des besoins caloriques du poids actuel
export function perteCaloriqueMaximale(userData) {
  const coefSexe = userData.sexe === "M" ? 5 : -16;
  const age = parseInt(
    (Date.now() - new Date(userData.naissance)) / 31557600000
  );

  const cal = parseInt(
    (userData.activitePhysiqueBase +
      0.02 * userData.activiteFaible +
      0.04 * userData.activiteMoyenne +
      0.06 * userData.activiteForte) *
      (9.99 * userData.poids + 6.25 * userData.taille - 4.92 * age + coefSexe)
  );

  return parseInt(cal * 0.25);
}

// détermine la dépense et la réduction selon 3 stratégies:
// - dépense maximisée = max 20% du déficit max autorisé
// - réduction maximisée = max 15% du déficit max autorisé
// - équilibre entre déficit et réduction = max 12.5% du déficit max autorisé
export function strategieDeficit(deficitMax, deficit, strategie = "") {
  if (strategie === "depense") {
    let depense = deficitMax * 0.8;
    let reduction = deficitMax * 0.2;

    if (depense > deficit) {
      return { depense: deficit, reduction: 0 };
    }

    if (reduction > deficit - depense) {
      return { depense, reduction: deficit - depense };
    }

    return { depense, reduction };
  } else if (strategie === "reduction") {
    let depense = deficitMax * 0.4;
    let reduction = deficitMax * 0.6;

    if (reduction > deficit) {
      return { depense: 0, reduction: deficit };
    }

    if (depense > deficit - reduction) {
      return { depense: deficit - reduction, reduction };
    }

    return { depense, reduction };
  } else {
    return { depense: deficit / 2, reduction: deficit / 2 };
  }
}