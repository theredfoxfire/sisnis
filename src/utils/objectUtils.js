export function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function ensureObject(item, defaultObject = {}) {
  return typeof item === "object" && item !== null ? item : defaultObject;
}
