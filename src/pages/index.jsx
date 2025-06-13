import { PageBase } from '@/components/layout';
import { HomeContent } from '@/components/content';
import AJAX from '@/services/AJAX';

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
  return (
    <PageBase>
      <HomeContent products={products} />
    </PageBase>
  );
}
