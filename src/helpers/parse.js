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

export function parseMoney(value) {
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   }).format(value);
}
