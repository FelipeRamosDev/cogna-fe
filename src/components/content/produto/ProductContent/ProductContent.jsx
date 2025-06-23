import { Container, Button, Card, ImagePlaceholder } from '@/components/common';
import { parseMoney } from '@/utils/parse';

/**
 * Renders the detailed view of a single product, including image, name, category, price, and description.
 *
 * Structured using a Card layout inside a Container, this component displays all essential
 * product information and provides a button to add the item to the cart.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product data to display.
 * @param {string} props.product.name - The name of the product.
 * @param {string} props.product.category - The category to which the product belongs.
 * @param {number} props.product.price - The price of the product.
 * @param {string} props.product.description - A textual description of the product.
 *
 * @returns {JSX.Element} A detailed product section with visual and textual elements.
 */
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

                  <Button className="add-to-cart" color="tertiary" fullwidth>Adicionar ao Carrinho</Button>

                  <div className="description-wrap">
                     <span className="label">Descrição:</span>
                     <pre className="description">{product.description}</pre>
                  </div>
               </div>
            </Card>
         </Container>
      </div>
   );
}
