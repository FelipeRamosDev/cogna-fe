import { useRouter } from 'next/navigation';
import { Container } from '@/components/common';
import { ProductForm } from '@/components/forms';
import { PageHeader } from '@/components/headers';
import AJAX from '@/services/AJAX';

export default function CreateProductContent() {
   const ajax = AJAX();
   const router = useRouter();

   const handleSubmit = async (values) => {
      try {
         const response = await ajax.put('/produto/criar', values);
         const created = response.data;

         if (!created || !created.success) {
            throw new Error(created.message || 'Erro desconhecido ao criar o produto.');
         }

         router.push('/meu-perfil');
         return created;
      } catch (error) {
         throw new Error('Erro ao cadastrar o produto: ' + error.message);
      }
   }

   return (
      <div className="CreateProductContent">
         <PageHeader title="Cadastrar Novo Produto" subtitle="Cadastre abaixo um novo produto para a loja." />

         <Container>
            <ProductForm handleSubmit={handleSubmit}/>
         </Container>
      </div>
   );
}
