import { useRouter } from 'next/navigation';
import { FormControl, FormInput } from '@/components/common';
import Ajax from '@/services/AJAX';

/**
 * LoginForm component for user authentication.
 * Renders a form for email and password, and handles login submission.
 * On successful login, redirects the user to the home page.
 *
 * @returns {JSX.Element}
 */
export default function LoginForm() {
   const router = useRouter();

   const handleSubmit = async (data) => {
      const ajax = Ajax(process.env.NEXT_PUBLIC_API_ROOT);

      try {
         const loginUser = await ajax.post('/auth/login', data);

         if (!loginUser.data.success) {
            throw loginUser;
         }

         router.push('/');
      } catch (error) {
         const errorData = error.response ? error.response.data : error;
         console.error(errorData);
      }
   };

   return (
      <FormControl submitLabel="Entrar" onSubmit={handleSubmit}>
         <FormInput fieldName="email" label="E-mail" type="email" placeholder="Digite seu e-mail" />
         <FormInput fieldName="password" label="Senha" type="password" placeholder="Digite sua senha" />
      </FormControl>
   );
}
