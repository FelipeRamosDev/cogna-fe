import { FormControl, FormInput } from '@/components/common';
import { useAuth } from '@/providers/AuthContext';

export default function RegisterForm() {
   const { register } = useAuth();
   const handleSubmit = async (data) => await register(data);

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
