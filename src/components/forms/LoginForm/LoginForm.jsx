import { FormControl, FormInput } from '@/components/common';
import { useAuth } from '@/providers/AuthContext';

/**
 * LoginForm component for user authentication.
 * Renders a form for email and password, and handles login submission.
 * On successful login, redirects the user to the home page.
 *
 * @returns {JSX.Element}
 */
export default function LoginForm() {
   const { login } = useAuth();
   const handleSubmit = async (data) => await login(data.email, data.password);

   return (
      <FormControl submitLabel="Entrar" onSubmit={handleSubmit}>
         <FormInput fieldName="email" label="E-mail" type="email" placeholder="Digite seu e-mail" />
         <FormInput fieldName="password" label="Senha" type="password" placeholder="Digite sua senha" />
      </FormControl>
   );
}
