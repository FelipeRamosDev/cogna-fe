import { Card } from '@/components/common';
import { parseCSS, parseMoney } from '@/helpers/parse';
import Image from 'next/image';
import ImagePlaceholder from '@/resources/images/image_placeholder.svg';

export default function ProductTile({ product, className = '' }) {
   const classes = parseCSS('ProductTile', className);

   if (!product) {
      return <></>;
   }

   return (
      <Card className={classes} elevation="l" padding="none">
         <div className="image-wrap">
            <Image
               src={ImagePlaceholder}
               alt="Image Placeholder"
               fill
               style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
               }}
            />
         </div>

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
