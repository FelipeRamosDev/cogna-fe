import { useRouter } from 'next/navigation';
import { Container } from '@/components/common';
import { ProductForm } from '@/components/forms';
import { PageHeader } from '@/components/headers';
import AJAX from '@/services/AJAX';

export default function EditProductContent({ product }) {
   const ajax = AJAX();
   const router = useRouter();

   const handleSubmit = async (values) => {
      delete values.id;
      delete values.created_at;

      const payload = {
         id: product.id,
         data: values,
      }

      try {
         const response = await ajax.post('/produto/editar', payload);
         const updated = response.data;

         if (!updated || !updated.success) {
            throw new Error(updated.message || 'Erro desconhecido ao editar o produto.');
         }

         router.push('/meu-perfil');
         return updated;
      } catch (error) {
         throw new Error('Erro ao editar o produto: ' + error.message);
      }
   }

   return (
      <div className="EditProductContent">
         <PageHeader title="Editar Produto" subtitle="Edite abaixo seu produto na loja." />

         <Container>
            <ProductForm editMode product={product} handleSubmit={handleSubmit}/>
         </Container>
      </div>
   );
}
