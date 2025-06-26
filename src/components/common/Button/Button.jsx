import { parseCSS, parsePadding, parseRadius } from "@/utils/parse";
import Spinner from "../Spinner/Spinner";

/**
 * Renders a customizable Button component with various styling options.
 *
 * @component
 * @param {Object} props - The props for the Button component.
 * @param {string} [props.className] - Additional CSS class names to apply to the button.
 * @param {'filled'|'outlined'|'transparent'} [props.variant='filled'] - The visual variant of the button.
 * @param {'primary'|'secondary'|'tertiary'} [props.color='primary'] - The color theme of the button. This option will only work if the variant is set to "filled"
 * @param {boolean} [props.fullwidth] - If true, the button will take the full width of its container.
 * @param {boolean} [props.disabled=false] - If true, the button will be disabled and not clickable.
 * @param {boolean} [props.isLoading=false] - If true, shows a loading spinner instead of button content.
 * @param {'none'|'xs'|'s'|'m'|'l'} [props.padding='s'] - The internal padding size of the button.
 * @param {'none'|'xs'|'s'|'m'|'l'|'full'} [props.radius='s'] - The border-radius size of the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 *
 * @returns {JSX.Element} A styled button element.
 */
export default function Button({
   variant = 'filled',
   color = 'primary',
   padding = 's',
   radius = 's',
   isLoading = false,
   disabled = false,
   className,
   fullwidth,
   children,
   ...props
}) {
   const fullwidthClass = fullwidth && 'fullwidth';

   const classes = parseCSS(className, [
      'Button',
      fullwidthClass,
      variant,
      color,
      parseRadius(radius),
      parsePadding(padding)
   ]);

   return (
      <button className={classes} disabled={disabled || isLoading} {...props}>
         {isLoading ? <Spinner size="1rem" /> : children}
      </button>
   );
}
