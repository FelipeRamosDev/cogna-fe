import { parseCSS } from '@/utils/parse';

/**
 * Renders a layout Container component with optional custom styling.
 *
 * @component
 * @param {Object} props - The props for the Container component.
 * @param {string} [props.className] - Additional CSS classes to apply to the container.
 * @param {React.ReactNode} props.children - The content to be rendered inside the container.
 *
 * @returns {JSX.Element} A div element with container styling.
 */
export default function Container({ className, children }) {
   const classes = parseCSS(className, 'Container');

   return (
      <div className={classes} data-testid="container">
         {children}
      </div>
   );
}
