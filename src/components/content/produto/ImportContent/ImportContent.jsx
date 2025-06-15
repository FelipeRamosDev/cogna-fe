import { useState } from 'react';
import { Button, Container } from '@/components/common';
import FileInput from '@/components/inputs/FileInput/FileInput';
import AJAX from '@/services/AJAX';

export default function ImportContent() {
   const [ file, setFile ] = useState(null);

   const handleSubmit = async (event) => {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      formData.append("file", file);

      try {
         const res = await AJAX.post('/produto/importar', formData);
         console.log('Produtos importados com sucesso:', res.data);
      } catch (error) {
         console.error('Error importing products:', error);
      }
   }

   const handleChange = (file) => {
      setFile(file);
   }

   return (
      <Container className="ImportContent">
         <h1 className="page-title">Importar Produtos</h1>
         <p className="page-description">Carregue seus produtos em um JSON para importá-los.</p>

         <form onSubmit={handleSubmit}>
            <FileInput className="import-input" fileValue={file} onChange={handleChange} />
            <Button type="submit" variant="filled" color="tertiary" fullwidth disabled={Boolean(file)}>Importar</Button>
         </form>
      </Container>
   );
}
