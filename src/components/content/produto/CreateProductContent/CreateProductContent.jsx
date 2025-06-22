import { Button, Card, Container, FormControl, FormInput } from "@/components/common";
import { PageHeader } from "@/components/headers";
import { ContentSidebar } from "@/components/layout";
import AJAX from "@/services/AJAX";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function CreateProductContent() {
   const ajax = AJAX();
   const router = useRouter();

   const handleSubmit = async (values) => {
      try {
         const response = await ajax.put('/produto/criar', values);
         const created = response.data;
         if (!created || !created.success) {
            throw new Error(created.error || 'Erro desconhecido ao criar o produto.');
         }

         console.log('Produto criado com sucesso:', values);
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
            <FormControl hideSubmit onSubmit={handleSubmit}>
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
                        <Button color="tertiary" fullwidth>Salvar Produto</Button>
                     </Card>
                  </Fragment>
               </ContentSidebar>
            </FormControl>
         </Container>
      </div>
   );
}
