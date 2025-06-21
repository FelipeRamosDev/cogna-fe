import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container } from '@/components/common';
import { FileInput } from '@/components/inputs';
import Ajax from '@/services/AJAX';

/**
 * ImportContent component for importing products via JSON file upload.
 * Handles file selection, form submission, and displays a JSON example for users.
 *
 * @returns {JSX.Element}
 */
export default function ImportContent() {
   const [ file, setFile ] = useState(null);
   const [ loading, setLoading ] = useState(false);
   const router = useRouter();
   const ajax = Ajax();

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      const formData = new FormData(event.target);
      formData.append('file', file);

      try {
         const res = await ajax.post('/produto/importar', formData);
         if (res.data.success) {
            router.push('/');
         } else {
            throw res;
         }
      } catch (error) {
         const errorData = error.response ? error.response.data : error;
         console.error(errorData);
      } finally {
         setLoading(false);
         setFile(null);
      }
   }

   const handleChange = (file) => {
      setFile(file);
   }

   return (
      <Container className="ImportContent">
         <h1 className="page-title">Importar Produtos</h1>
         <p className="page-description">Carregue seus produtos em um JSON para importá-los.</p>

         <details className="code-example-accordeon">
            <summary>Exemplo de JSON</summary>

            <pre className="code-example">
               {JSON.stringify([
                  {
                     "name": "Produto 1",
                     "price": 100.00,
                     "description": "Descrição do Produto 1",
                     "category": "Categoria A",
                     "stocke_quantity": 50,
                  },
                  {
                     "name": "Produto 2",
                     "price": 200.00,
                     "description": "Descrição do Produto 2",
                     "category": "Categoria B",
                     "stocke_quantity": 10,
                  }
               ], null, 2)}
            </pre>
         </details>

         <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FileInput className="import-input" fileValue={file} onChange={handleChange} />

            <Button type="submit" variant="filled" color="tertiary" fullwidth disabled={loading}>
               {loading ? 'Importando...' : 'Importar'}
            </Button>
         </form>
      </Container>
   );
}
