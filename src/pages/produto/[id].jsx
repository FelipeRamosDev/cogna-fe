import AJAX from '@/services/AJAX';
import { ProductContent } from '@/components/content';
import { PageBase } from '@/components/layout';

export async function getServerSideProps(context) {
   const productID = context.query.id;
   
   try {
      const { data } = await AJAX.get(`/produto/${productID}`);

      return {
         props: { product: data.product }
      }
   } catch (error) {
      return { props: { error: true, errorMsg: error.message }};
   }
}

export default function Product({ product }) {
   return (
      <PageBase>
         <ProductContent product={product} />
      </PageBase>
   );
}
