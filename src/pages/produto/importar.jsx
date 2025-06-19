import { ImportContent } from '@/components/content';
import { PageBase } from '@/components/layout';

export async function getServerSideProps() {
   return {
      props: {
         CLIENT_API_ROOT: process.env.CLIENT_API_ROOT
      }
   };
}

export default function Import({ CLIENT_API_ROOT }) {
   return (
      <PageBase authProtected>
         <ImportContent CLIENT_API_ROOT={CLIENT_API_ROOT} />
      </PageBase>
   );
};
