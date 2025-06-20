import Head from 'next/head';
import Ajax from '@/services/AJAX';
import { ProductContent } from '@/components/content';
import { PageBase } from '@/components/layout';

/**
 * getServerSideProps fetches product data for the given product ID from the backend API.
 * Returns product data as props or an error if not found.
 *
 * @param {object} context - Next.js context object containing query params.
 * @returns {Promise<{props: {product?: object, error?: boolean, errorMsg?: string}}>} Props for the page.
 */
export async function getServerSideProps(context) {
   const productID = context.query.id;
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

/**
 * Product page component for displaying a single product's details.
 * Shows meta tags for SEO and renders ProductContent or a not found message.
 *
 * @param {object} props
 * @param {object} [props.product] - Product data to display.
 * @returns {JSX.Element}
 */
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
