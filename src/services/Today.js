export function today() {
  const today = new Date(Date.now());
  const dayNumber = (today.getDate() > 9 ? "" : "0") + today.getDate();

  return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + dayNumber;
}
