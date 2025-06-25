import { ProductTile } from "@/components/tiles";
import AJAX from "@/services/AJAX";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Renders a grid of products, each wrapped in a link to its individual product page.
 *
 * Maps through the list of products and displays a `ProductTile` for each item,
 * allowing navigation to the corresponding product details.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} [props.staticProducts=[]] - An array of product objects to display.
 * @param {string|number} props.staticProducts[].id - Unique identifier for each product.
 * @param {Object} [props.selectFields] - Fields to select from the product data.
 * @param {Object} [props.where] - Conditions to filter the products.
 * @param {Object} [props.sort] - Sorting options for the products.
 * @param {number} [props.limit] - Maximum number of products to display.
 * @param {boolean} [props.populateAuthor] - Whether to include author details in the product data.
 *
 * @returns {JSX.Element} A grid layout of product tiles with navigable links.
 */
export default function ProductsGrid({ staticProducts, selectFields, where, sort, limit, populateAuthor, ...props }) {
   const [ products, setProducts ] = useState(staticProducts);
   const ajax = AJAX();

   useEffect(() => {
      if (products) {
         return;
      }

      ajax.post('/produto/busca', { where, sort, limit, populateAuthor, selectFields }).then(({ data }) => {
         const { success, products } = data;

         if (!success) {
            console.error('Failed to fetch products:', data);
            return;
         }
         
         setProducts(products);
      }).catch(error => {
         console.error('Error fetching products:', error);
      });
   }, [ selectFields, where, sort, limit, populateAuthor ]);

   return (
      <div className="ProductsGrid" {...props}>
         {products?.map(product => (
            <Link key={product.id} className="item" href={`/produto/${product.id}`}>
               <ProductTile product={product} />
            </Link>
         ))}
      </div>
   );
}
