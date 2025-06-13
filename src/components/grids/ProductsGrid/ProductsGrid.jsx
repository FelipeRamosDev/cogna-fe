import { ProductTile } from "@/components/tiles";
import Link from "next/link";

/**
 * Renders a grid of products, each wrapped in a link to its individual product page.
 *
 * Maps through the list of products and displays a `ProductTile` for each item,
 * allowing navigation to the corresponding product details.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} [props.products=[]] - An array of product objects to display.
 * @param {string|number} props.products[].id - Unique identifier for each product.
 *
 * @returns {JSX.Element} A grid layout of product tiles with navigable links.
 */
export default function ProductsGrid({ products = [] }) {
   return (
      <div className="ProductsGrid">
         {products.map(product => (
            <Link key={product.id} className="item" href={`/produto/${product.id}`}>
               <ProductTile product={product} />
            </Link>
         ))}
      </div>
   );
}
