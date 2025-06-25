import { Container } from '@/components/common';
import { ProductsGrid } from '@/components/grids';

/**
 * Renders the main content section of the home page.
 *
 * Wraps the products grid inside a layout container to ensure proper spacing and alignment.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.products - An array of product objects to be displayed in the grid.
 *
 * @returns {JSX.Element} A section of the homepage displaying the product grid.
 */
export default function HomeContent({ products }) {
   return (
      <div className="HomeContent">
         <Container>
            <ProductsGrid staticProducts={products} />
         </Container>
      </div>
   );
}
