/**
 * Formatting utilities.
 * Replaces inline formatting patterns scattered across pages.
 */

/**
 * Capitalize the first letter of a string.
 * Used for category titles in Categories.jsx.
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate a simple unique ID.
 * Previously inline in api.js.
 * @returns {string}
 */
export function generateUid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
