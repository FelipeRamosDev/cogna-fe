import { parseCSS, parsePadding, parseRadius } from "@/helpers/parse";

export default function Button({ className, type, fullwidth, padding = 's', radius = 's', children }) {
   const fullwidthClass = fullwidth && 'fullwidth';
   const ctaClass = type === 'cta' && 'cta';

   const classes = parseCSS(className, [
      'Button',
      fullwidthClass,
      ctaClass,
      parseRadius(radius),
      parsePadding(padding)
   ]);

   return (
      <button className={classes}>{children}</button>
   );
}
