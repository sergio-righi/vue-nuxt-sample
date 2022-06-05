/**
 * convert UTC date string to Date object
 * @param {string} value
 * @returns
 */

const fromUTC = (value: string): Date | any => {
  if (typeof value !== "string") return;
  const timestamp = Date.parse(value.slice(1));
  const date = new Date(timestamp);
  date.setTime(date.getTime() + 4 * 60 * 60 * 1000);
  return date;
};

/**
 * convert date to UTC format
 * @param {Date} value
 * @returns
 */

const toUTC = (value: Date): string | any => {
  if (value === null) return;
  value = typeof value === "string" ? new Date(value) : value;
  return "+" + value.toISOString();
};

/**
 * create a runtime helper to convert timestamp to formatted date
 * @param value timestamp
 * @param locale language "en" as default
 * @returns formatted date
 */

const timestamp = (value: number, locale = "en"): string => {
  return new Date(value).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * capitalize a word
 * @param {string} value
 * @returns {string}
 */

const toCapitalize = (value: string): string => {
  const lower = value.toLowerCase();
  return value.charAt(0).toUpperCase() + lower.slice(1);
};

/**
 * object array to dropdown list
 * @param {[any]} o
 * @param {any} i18n
 * @param {boolean} index
 * @returns {[Object]}
 */

const toDropdownList = (o: Array<any>, i18n: any, index: boolean = false): Object | any => {
  if (i18n === null) return;
  return o
    .filter(x => !x.disabled)
    .map((x, i) => ({
      value: index ? i : x.value,
      text: i18n.tc(`enum.${x.key}`, 1)
    }));
};

/**
 * convert a form to pair-value
 * @param {[Object]} form
 * @returns {Object}
 */

const toDictionary = (form: Array<any>): Object => {
  if (!form) return {};
  else if (typeof form !== "object") return {};
  else {
    return Object.values(form)
      .filter(item => item.name && item.value)
      .map(item => ({ [item.name]: item.value }))
      .reduce((o, item) => Object.assign(o, item), {});
  }
};

/**
 * Simple object check.
 * @param {any} value
 * @returns {boolean}
 */

const isObject = (value: any): boolean => {
  return value && typeof value === "object" && !Array.isArray(value);
};

/**
 * Deep merge two objects.
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

/**
 * create an instance using a generic constraint
 * @param t 
 * @param args 
 * @returns 
 */

function createInstance<T>(type: new (...constructorArgs: any[]) => T, ...args: any[]): T {
  // eslint-disable-next-line new-cap
  return new type(...args);
}

export default {
  objectId,
  deepMerge,
  toCapitalize,
  fromUTC,
  timestamp,
  toUTC,
  toDropdownList,
  toDictionary,
  createInstance,
};
