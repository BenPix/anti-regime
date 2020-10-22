export default function conversionSemainesEnDureeText(semaines) {
  const annees = parseInt(semaines / 52);
  const mois = parseInt((semaines - annees * 52) / 4);
  const semainesRestantes = semaines - annees * 52 - mois * 4;

  const anneesStr = annees ? annees + " an" + (annees === 1 ? " " : "s ") : "";
  const moisStr = mois ? mois + " mois " : "";
  const semainesStr = semainesRestantes
    ? semainesRestantes + " semaine" + (semainesRestantes === 1 ? " " : "s ")
    : "";

  return anneesStr + moisStr + semainesStr;
}
