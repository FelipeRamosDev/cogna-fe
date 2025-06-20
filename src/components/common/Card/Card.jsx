import { parseCSS, parseElevation, parsePadding, parseRadius } from '@/utils/parse';

/**
 * Card component that wraps its children with customizable padding and optional additional classes.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string | string[]} [props.className=''] - Additional CSS classes to apply.
 * @param {'none' | 'xs' | 's' | 'm' | 'l' | 'xl'} [props.padding='m'] - Padding size applied to the card. Use 'none' to disable.
 * @param {'none' | 'xs' | 's' | 'm' | 'l' | 'xl'} [props.radius='m'] - The border radius size applied to the card. Use 'none' to disable.
 * @param {'none' | 'xs' | 's' | 'm' | 'l' | 'xl'} [props.elevation='m'] - The elevation effect applied to the card. Use 'none' to disable.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 *
 * @returns {JSX.Element} A div element with the computed class names and the provided children.
 */
export default function Card({ className = '', padding = 'm', radius = 'm', elevation = 'm', children }) {
   const classes = parseCSS(className, [
      'Card',
      parsePadding(padding),
      parseRadius(radius),
      parseElevation(elevation)
   ]);

   return (
      <div className={classes} data-testid="card">
         {children}
      </div>
   );
}
