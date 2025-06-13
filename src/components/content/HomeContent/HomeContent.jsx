import { Container } from '@/components/common';
import { ProductsGrid } from '@/components/grids';

export default function HomeContent({ products }) {
   return (
      <div className="HomeContent">
         <Container>
            <ProductsGrid products={products} />
         </Container>
      </div>
   );
}
