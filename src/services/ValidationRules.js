export function dateValidation(value) {
  return Date.now() > new Date(value);
}
