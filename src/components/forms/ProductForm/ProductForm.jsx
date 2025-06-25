import { Button, Card, FormControl, FormInput } from '@/components/common';
import { ContentSidebar } from '@/components/layout';
import { useAuth } from '@/providers/AuthContext';
import { Fragment } from 'react';

export default function ProductForm({ editMode, product = {}, handleSubmit = () => {} }) {
   const { user } = useAuth();

   if (!user) {
      return null;
   }

   if (!product.author_id && !editMode) {
      product.author_id = user.id;
   }

   return (
      <FormControl initialValues={product} hideSubmit onSubmit={handleSubmit}>
         <ContentSidebar reverseColumn>
            <Fragment>
               <Card padding="l" radius="s">
                  <FormInput fieldName="name" label="Nome" />
                  <FormInput fieldName="description" label="Descrição" multiline minLines={15} />
               </Card>
            </Fragment>

            <Fragment>
               <Card>
                  <FormInput fieldName="category" label="Categoria" />
                  <FormInput fieldName="price" type="number" label="Preço" />
               </Card>

               <Card>
                  <Button color="tertiary" fullwidth>
                     {editMode ? 'Editar Produto' : 'Cadastrar Produto'}
                  </Button>
               </Card>
            </Fragment>
         </ContentSidebar>
      </FormControl>
   );
}
