import { PageBase } from '@/components/layout';
import { LoginContent } from '@/components/content';
import Head from 'next/head';

export default function Login() {
  const META_TITLE = 'Cogna - Login de usuário';
  const META_DESCRIPTION = 'Página de login do usuário.';
  const META_KEYWORDS = 'login, cogna, autenticação';
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

      <LoginContent />
    </PageBase>
  );
}
