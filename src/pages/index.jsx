import { PageBase } from '@/components/layout';
import { HomeContent } from '@/components/content';
import AJAX from '@/services/AJAX';
import Head from 'next/head';

export async function getServerSideProps() {
  try {
    const { data } = await AJAX.get('/');

    return {
      props: { products: data.products }
    };
  } catch (error) {
    return { props: { error: true, errorMsg: error.message }};
  }
}

export default function HomePage({ products }) {
  const META_TITLE = 'Cogna - Todos produtos';
  const META_DESCRIPTION = 'Página principal com listagem de todos os produtos da loja.';
  const META_KEYWORDS = 'produtos, loja, cogna, comprar, ecommerce';
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

      <HomeContent products={products} />
    </PageBase>
  );
}
