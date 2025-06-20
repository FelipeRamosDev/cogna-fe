import { Card, ImagePlaceholder } from '@/components/common';
import { parseCSS, parseMoney } from '@/utils/parse';

/**
 * Displays a compact tile view of a product, including image placeholder, name, price, category, and description.
 *
 * Uses a Card layout with customizable CSS classes and formats the price using a helper function.
 * Returns an empty fragment if the product prop is not provided.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product data to display.
 * @param {string} props.product.name - The product's name.
 * @param {string|number} props.product.price - The product's price.
 * @param {string} props.product.category - The category of the product.
 * @param {string} props.product.description - A brief description of the product.
 * @param {string} [props.className=''] - Optional additional CSS class names for styling.
 *
 * @returns {JSX.Element} A styled product tile or an empty fragment if no product is given.
 */
export default function ProductTile({ product, className = '' }) {
   const classes = parseCSS('ProductTile', className);

   if (!product) {
      return <></>;
   }

   return (
      <Card className={classes} elevation="l" padding="none">
         <ImagePlaceholder />

         <div className="product-info">
            <div className="info-header">
               <h3 className="title">{product.name}</h3>
               <span className="price">{parseMoney(product.price)}</span>
            </div>

            <span className="category">{product.category}</span>
            <p className="description">{product.description}</p>
         </div>
      </Card>
   );
}
