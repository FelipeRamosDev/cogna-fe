import { useRouter } from 'next/navigation';
import { FormControl, FormInput } from '@/components/common';
import Ajax from '@/services/AJAX';

export default function RegisterForm() {
   const router = useRouter();

   const handleSubmit = async (data) => {
      const ajax = Ajax(process.env.NEXT_PUBLIC_API_ROOT);
      
      try {
         const registerUser = await ajax.put('/auth/cadastro', data);

         if (!registerUser.data.success) {
            throw registerUser;
         }

         router.push('/');
      } catch (error) {
         const errorData = error.response ? error.response.data : error;
         console.error(errorData);
      }
   };

   return (
      <FormControl submitLabel="Entrar" onSubmit={handleSubmit}>
         <div className="line-inputs">
            <FormInput fieldName="firstName" label="Nome" placeholder="Digite seu nome" />
            <FormInput fieldName="lastName" label="Sobrenome" placeholder="Digite seu sobrenome" />
         </div>

         <FormInput fieldName="email" label="E-mail" type="email" placeholder="Digite seu e-mail" />
         <div className="line-inputs">
            <FormInput fieldName="password" label="Senha" type="password" placeholder="Digite sua senha" />
            <FormInput fieldName="confirmPassword" label="Confirmar Senha" type="password" placeholder="Confirme sua senha" />
         </div>
      </FormControl>
   );
}
