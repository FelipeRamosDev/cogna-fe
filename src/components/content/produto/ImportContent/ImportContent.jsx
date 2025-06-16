import { useState } from 'react';
import { Button, Container } from '@/components/common';
import FileInput from '@/components/inputs/FileInput/FileInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ImportContent({ CLIENT_API_ROOT = 'http://localhost:8000' }) {
   const [ file, setFile ] = useState(null);
   const [ loading, setLoading ] = useState(false);
   const router = useRouter();

   const AJAX = axios.create({
      baseURL: CLIENT_API_ROOT,
      timeout: 30000
   });

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      const formData = new FormData(event.target);
      formData.append('file', file);

      try {
         const res = await AJAX.post('/produto/importar', formData);
         if (res.data.success) {
            router.push('/');
         } else {
            throw res;
         }
      } catch (error) {
         console.error('Error importing products:', error);
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

         <details>
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

         <form onSubmit={handleSubmit}>
            <FileInput className="import-input" fileValue={file} onChange={handleChange} />

            <Button type="submit" variant="filled" color="tertiary" fullwidth disabled={loading}>
               {loading ? 'Importando...' : 'Importar'}
            </Button>
         </form>
      </Container>
   );
}
