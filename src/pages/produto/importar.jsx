import { ImportContent } from '@/components/content';
import { PageBase } from '@/components/layout';

/**
 * getServerSideProps provides the CLIENT_API_ROOT environment variable as a prop for SSR.
 *
 * @returns {Promise<{props: {CLIENT_API_ROOT: string}}>} Props for the page.
 */
export async function getServerSideProps() {
   return {
      props: {
         CLIENT_API_ROOT: process.env.CLIENT_API_ROOT
      }
   };
}

/**
 * Import page for uploading products via JSON file.
 * Wraps ImportContent in a protected PageBase layout.
 *
 * @param {object} props
 * @param {string} props.CLIENT_API_ROOT - API root URL for backend requests.
 * @returns {JSX.Element}
 */
export default function Import({ CLIENT_API_ROOT }) {
   return (
      <PageBase authProtected>
         <ImportContent CLIENT_API_ROOT={CLIENT_API_ROOT} />
      </PageBase>
   );
};
