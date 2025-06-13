import { parseCSS, parsePadding, parseRadius } from "@/helpers/parse";

export default function Button({ className, type = 'filled', color = 'primary', fullwidth, padding = 's', radius = 's', children }) {
   const fullwidthClass = fullwidth && 'fullwidth';

   const classes = parseCSS(className, [
      'Button',
      fullwidthClass,
      type,
      color,
      parseRadius(radius),
      parsePadding(padding)
   ]);

   return (
      <button className={classes}>{children}</button>
   );
}
