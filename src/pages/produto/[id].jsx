import AJAX from '@/services/AJAX';
import { ProductContent } from '@/components/content';
import { PageBase } from '@/components/layout';
import Head from 'next/head';

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
   if (!product) {
      return (
         <PageBase>
            <h1>Produto não encontrado</h1>
            <p>O produto solicitado não existe ou foi removido.</p>
         </PageBase>
      );
   }

   const META_TITLE = `Cogna - ${product.name}`;
   const META_DESCRIPTION = product.description;
   const META_KEYWORDS = `produtos, loja, cogna, comprar, ecommerce, ${product.name}`;
   const META_AUTHOR = 'Felipe Ramos';
   const META_IMAGE = 'http://localhost/og-image.jpg';
   const META_URL = 'http://localhost/';

   return (
      <PageBase>
         <Head>
            <title>{META_TITLE}</title>
            <meta name="description" content={META_DESCRIPTION} />
            <meta name="keywords" content={META_KEYWORDS} />
            <meta name="author" content={META_AUTHOR} />
            <meta property="og:title" content={META_TITLE} />
            <meta property="og:description" content={META_DESCRIPTION} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={META_URL} />
            <meta property="og:image" content={META_IMAGE} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={META_TITLE} />
            <meta name="twitter:description" content={META_DESCRIPTION} />
            <meta name="twitter:image" content={META_IMAGE} />
            <link rel="canonical" href={META_URL} />
         </Head>

         <ProductContent product={product} />
      </PageBase>
   );
}
