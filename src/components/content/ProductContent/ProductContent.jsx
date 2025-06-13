import { Container, Button, Card, ImagePlaceholder } from '@/components/common';
import { parseMoney } from '@/helpers/parse';

export default function ProductContent({ product }) {
   return (
      <div className="ProductContent">
         <Container>
            <Card className="product-details" padding="none" elevation="xl">
               <ImagePlaceholder />

               <div className="product-info">
                  <p className="product-path">{product.category} / {product.name}</p>
                  <h1>{product.name}</h1>

                  <div className="price-group">
                     <span className="label">Preço:</span>
                     <p className="price">{parseMoney(product.price)}</p>
                  </div>

                  <Button className="add-to-cart" type="cta" fullwidth>Adicionar ao Carrinho</Button>

                  <div className="description-wrap">
                     <span className="label">Descrição:</span>
                     <p className="description">{product.description}</p>
                  </div>
               </div>
            </Card>
         </Container>
      </div>
   );
}
