import { parseCSS, parseElevation, parsePadding, parseRadius } from '@/helpers/parse';

/**
 * Card component that wraps its children with customizable padding and optional additional classes.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|string[]} [props.className=''] - Additional CSS classes to apply.
 * @param {'xs' | 's' | 'm' | 'l' | 'xl'} [props.padding='m'] - Padding size applied to the card.
 * @param {'xs' | 's' | 'm' | 'l' | 'xl'} [props.radius='m'] - The border radius size applied to the card.
 * @param {'xs' | 's' | 'm' | 'l' | 'xl'} [props.elevation='m'] - The elevation effect applied to the card.
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
      <div className={classes}>
         {children}
      </div>
   );
}
