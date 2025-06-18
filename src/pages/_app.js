import '@/styles/style.scss';
import '@/styles/theme-sheet.scss';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.variable}>
      <Component {...pageProps} />
    </main>
  );
}
