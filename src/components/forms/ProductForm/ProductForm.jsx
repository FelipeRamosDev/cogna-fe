import { Button, Card, FormControl, FormInput } from '@/components/common';
import { ContentSidebar } from '@/components/layout';
import { useAuth } from '@/providers/AuthContext';
import { Fragment, useState } from 'react';

export default function ProductForm({ editMode, product = {}, handleSubmit = async () => {} }) {
   const [ loading, setLoading ] = useState(false);
   const { user } = useAuth();
   const initialValues = {
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      price: product.price || 0,
      stock_quantity: product.stock_quantity || 0,
      author_id: product.author_id || ''
   }

   if (!user) {
      return null;
   }

   if (!initialValues.author_id && !editMode) {
      initialValues.author_id = user.id;
   }

   const handleFormSubmit = async (data) => {
      try {
         setLoading(true);
         return await handleSubmit(data);
      } finally {
         setLoading(false);
      }
   }

   return (
      <FormControl initialValues={initialValues} hideSubmit onSubmit={handleFormSubmit}>
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

                  <div className="line-inputs">
                     <FormInput fieldName="price" type="number" label="Preço" />
                     <FormInput fieldName="stock_quantity" type="number" label="Disponível no estoque" />
                  </div>
               </Card>

               <Card>
                  <Button color="tertiary" fullwidth isLoading={loading}>
                     {editMode ? 'Editar Produto' : 'Cadastrar Produto'}
                  </Button>
               </Card>
            </Fragment>
         </ContentSidebar>
      </FormControl>
   );
}
