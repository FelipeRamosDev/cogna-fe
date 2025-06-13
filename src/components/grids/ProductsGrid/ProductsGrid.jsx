import { ProductTile } from "@/components/tiles";
import Link from "next/link";

export default function ProductsGrid({ products = [] }) {
   return (
      <div className="ProductsGrid">
         {products.map(product => (
            <Link className="item" href={`/product/${product.id}`}>
               <ProductTile product={product} />
            </Link>
         ))}
      </div>
   );
}
