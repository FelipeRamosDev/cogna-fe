import { FormControl, FormInput } from '@/components/common';

export default function LoginForm() {
   const handleSubmit = (data) => {
      console.log('Formulário de login', data);
   };

   return (
      <FormControl submitLabel="Entrar" onSubmit={handleSubmit}>
         <FormInput fieldName="email" label="E-mail" type="email" placeholder="Digite seu e-mail" />
         <FormInput fieldName="password" label="Senha" type="password" placeholder="Digite sua senha" />
      </FormControl>
   );
}
