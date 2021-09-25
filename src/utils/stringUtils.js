export function getLatestChar(str) {
  return str.split("").pop();
}
export function yearToString(year) {
  let label = year.substring(3, 1) === 1 ? "Ganjil" : "Genap";
  return year.length < 1 ? "-" : year.substring(0, 4) + " - " + label;
}

export function ensureString(stringValue) {
  return typeof stringValue === "string" ? stringValue : "";
}
