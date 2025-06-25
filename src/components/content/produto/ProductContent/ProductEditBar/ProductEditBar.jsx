import { Button } from "@/components/common";
import { useAuth } from "@/providers/AuthContext";
import AJAX from "@/services/AJAX";
import { useRouter } from "next/navigation";

export default function ProductEditBar({ product = {} }) {
   const { user } = useAuth();
   const router = useRouter();
   const ajax = AJAX();
   
   const handleEdit = () => router.push('/produto/editar/' + product.id);
   const handleDelete = async () => {
      try {
         const response = await ajax.post('/produto/delete', { productID: product.id, authorID: product.author_id });
         if (!response.data.success) {
            throw response.data;
         }

         router.push('/meu-perfil');
      } catch (error) {
         console.error("Error deleting product:", error);
      }
   };

   if (user.id !== product.author_id) {
      return null; // Hide edit/delete buttons if the user is not the author
   }

   return (
      <div className="ProductEditBar">
         <Button color="primary" onClick={handleEdit}>Editar</Button>
         <Button color="error" onClick={handleDelete}>Deletar</Button>
      </div>
   );
}
