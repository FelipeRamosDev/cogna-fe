import '@/styles/style.scss';
import Head from 'next/head';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
})

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cogna - Teste para Full-stack</title>
        <meta name="description" content="Essa é uma aplicação teste para vaga Full-stack na Cogna Educacional" />
      </Head>

      <body className={roboto.variable}>
        <Component {...pageProps} />
      </body>
    </>
  );
}
