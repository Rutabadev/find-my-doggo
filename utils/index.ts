export const removeEmptyAttributes = (obj: any): any => {
  return Object.entries(obj)
    .filter(([, value]) => value !== '')
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
}
