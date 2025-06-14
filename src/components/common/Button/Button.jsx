import { parseCSS, parsePadding, parseRadius } from "@/helpers/parse";

/**
 * Renders a customizable Button component with various styling options.
 *
 * @component
 * @param {Object} props - The props for the Button component.
 * @param {string} [props.className] - Additional CSS class names to apply to the button.
 * @param {'filled'|'outlined'|'transparent'} [props.type='filled'] - The visual type of the button.
 * @param {'primary'|'secondary'|'tertiary'} [props.color='primary'] - The color theme of the button. This option will only work if the type is set to "filled"
 * @param {boolean} [props.fullwidth] - If true, the button will take the full width of its container.
 * @param {'none'|'xs'|'s'|'m'|'l'} [props.padding='s'] - The internal padding size of the button.
 * @param {'none'|'xs'|'s'|'m'|'l'|'full'} [props.radius='s'] - The border-radius size of the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 *
 * @returns {JSX.Element} A styled button element.
 */
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
