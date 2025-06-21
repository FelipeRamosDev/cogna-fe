import { ImportContent } from '@/components/content';
import { PageBase } from '@/components/layout';

/**
 * Import page for uploading products via JSON file.
 * Wraps ImportContent in a protected PageBase layout.
 *
 * @param {object} props
 * @returns {JSX.Element}
 */
export default function Import() {
   return (
      <PageBase authProtected>
         <ImportContent />
      </PageBase>
   );
};
