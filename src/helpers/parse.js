/**
 * Maps padding size keywords to corresponding CSS class names.
 *
 * @param {string} size - Padding size ('xs', 's', 'm', 'l', 'xl', 'none').
 * @returns {string} The CSS class name for the specified padding size, or empty string if 'none' or unrecognized.
 */
export function parsePadding(size) {
   switch (size) {
      case 'xs':
         return 'padding-xs';
      case 's':
         return 'padding-s';
      case 'm':
         return 'padding-m';
      case 'l':
         return 'padding-l';
      case 'xl':
         return 'padding-xl';
      case 'none':
      default:
         return '';
   }
}

/**
 * Maps border-radius size keywords to corresponding CSS class names.
 *
 * @param {string} size - Radius size ('xs', 's', 'm', 'l', 'xl', 'none').
 * @returns {string} The CSS class name for the specified radius size, or empty string if 'none' or unrecognized.
 */
export function parseRadius(size) {
   switch (size) {
      case 'xs':
         return 'radius-xs';
      case 's':
         return 'radius-s';
      case 'm':
         return 'radius-m';
      case 'l':
         return 'radius-l';
      case 'xl':
         return 'radius-xl';
      case 'none':
      default:
         return '';
   }
}

/**
 * Maps elevation size keywords to corresponding CSS class names.
 *
 * @param {string} size - Elevation size ('xs', 's', 'm', 'l', 'xl', 'none').
 * @returns {string} The CSS class name for the specified elevation size, or empty string if 'none' or unrecognized.
 */
export function parseElevation(size) {
   switch (size) {
      case 'xs':
         return 'elevation-xs';
      case 's':
         return 'elevation-s';
      case 'm':
         return 'elevation-m';
      case 'l':
         return 'elevation-l';
      case 'xl':
         return 'elevation-xl';
      case 'none':
      default:
         return '';
   }
}

/**
 * Combines one or two sets of CSS class names into a single string.
 * Accepts strings or arrays of strings and filters out falsy values.
 *
 * @param {string|string[]} classes - First set of class names.
 * @param {string|string[]} merge - Second set of class names to merge.
 * @returns {string} Combined class names separated by spaces.
 */
export function parseCSS(classes, merge) {
   let result = [];

   if (typeof classes === 'string') {
      result = [ ...result, ...classes.split(' ') ];
   }

   if (Array.isArray(classes)) {
      result = [ ...result, ...classes ];
   }

   if (typeof merge === 'string') {
      result = [ ...result, ...merge.split(' ') ];
   }

   if (Array.isArray(merge)) {
      result = [ ...result, ...merge ];
   }

   return result.filter(item => item).join(' ');
}

/**
 * Formats a numeric value as Brazilian Real currency (R$) with two decimal places.
 *
 * @param {number} value - The numeric value to format.
 * @returns {string} The formatted currency string in 'pt-BR' locale.
 */
export function parseMoney(value) {
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   }).format(value);
}
