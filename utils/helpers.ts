
/**
 * Simple object check.
 * @param {any} value
 * @returns {boolean}
 */

const isObject = (value: any): boolean => {
  return value && typeof value === "object" && !Array.isArray(value);
};

/**
 * Deep merge two objects
 * @param {Object} target
 * @param {Object} ...sources
 * @returns {Object}
 */

const deepMerge = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

/**
 * It generates ObjectId
 * @param {Math} m
 * @param {DateConstructor} d
 * @param {Function} s
 * @returns {string}
 */

const objectId = (m: Math = Math, d: DateConstructor = Date, h = 16, s: Function = (s: number) => m.floor(s).toString(h)): string =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

export const helpers = {
  objectId,
  deepMerge,
};
