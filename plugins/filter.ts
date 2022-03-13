import Vue from "vue";

Vue.filter("timestamp", timestamp);

/**
 * create a runtime helper to convert timestamp to formatted date
 * @param value timestamp
 * @param locale language "en" as default
 * @returns formatted date
 */

function timestamp(value: number, locale = "en") {
  return new Date(value).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}