import { Container } from '@/components/common';
import { ProductDetails } from './sections';

export default function ProductContent({ product }) {
   return (
      <div className="ProductContent">
         <Container>
            <ProductDetails product={product} />
         </Container>
      </div>
   );
}
