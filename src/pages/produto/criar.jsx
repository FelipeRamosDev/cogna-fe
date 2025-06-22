import { CreateProductContent } from '@/components/content';
import { PageBase } from '@/components/layout';

export default function CreateProduct() {
   return (
      <PageBase useAuthentication noMarginHeader>
         <CreateProductContent />
      </PageBase>
   );
}
