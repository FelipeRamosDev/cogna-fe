import { Container, Button, Card, ImagePlaceholder } from '@/components/common';
import { parseMoney } from '@/utils/parse';
import ProductEditBar from './ProductEditBar/ProductEditBar';
import { AuthProvider } from '@/providers/AuthContext';

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
   console.log('ProductContent', product);

   return (
      <div className="ProductContent">
         <Container>
            <Card className="product-details" padding="none" elevation="xl">
               <ImagePlaceholder />

               <div className="product-info">
                  <AuthProvider noSpinner>
                     <ProductEditBar product={product} />
                  </AuthProvider>

                  <p className="product-path">{product.category} / {product.name}</p>
                  <h1 className="product-name">{product.name}</h1>
                  <div className="author-wrap">
                     <p>
                        Publicado em: <b>{new Date(product.created_at).toLocaleString()}</b> por <a href={`mailto:${product.author_email}`}>
                           {product.author_first_name} {product.author_last_name}
                        </a>
                     </p>
                  </div>

                  <div className="price-stock">
                     <div className="price-group">
                        <span className="label">Preço:</span>
                        <p className="price">{parseMoney(product.price)}</p>
                     </div>

                     <div className="stock-group">
                        <span className="label">Disponível</span>
                        <p className="stock">{product.stock_quantity || 'Indisponível'}</p>
                     </div>
                  </div>

                  <Button className="add-to-cart" color="tertiary" disabled={!Boolean(product.stock_quantity)} fullwidth>
                     Adicionar ao Carrinho
                  </Button>
               </div>

               <div className="description-wrap">
                  <h3 className="title">Descrição do produto:</h3>
                  <pre className="description">{product.description}</pre>
               </div>
            </Card>
         </Container>
      </div>
   );
}
