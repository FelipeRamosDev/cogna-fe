import Ajax from '@/services/AJAX';
import { PageBase } from '@/components/layout';
import { EditProductContent } from '@/components/content';

export async function getServerSideProps(context) {
   const productID = context.query.edit;
   const ajax = Ajax();

   try {
      const { data } = await ajax.get(`/produto/${productID}`);

      return {
         props: { product: data.product }
      }
   } catch (error) {
      return { props: { error: true, errorMsg: error.message }};
   }
}

export default function EditProduct({ product }) {
   if (!product) {
      return (
         <PageBase>
            <h1>Produto não encontrado</h1>
            <p>O produto solicitado não existe ou foi removido.</p>
         </PageBase>
      );
   }

   return (
      <PageBase useAuthentication noMarginHeader>
         <EditProductContent product={product} />
      </PageBase>
   );
}
