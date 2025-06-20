import { Card, Container } from '@/components/common';
import { LoginForm, RegisterForm } from '@/components/forms';
import { useState } from 'react';

/**
 * LoginContent component for user authentication UI.
 * Displays login and registration forms, allowing users to switch between them.
 *
 * @returns {JSX.Element}
 */
export default function LoginContent() {
   const [ formType, setFormType ] = useState('login');

   return (
      <div className="LoginContent">
         <Container>
            <Card className="login-card">
               <h1 className="card-title">Login de Usuário</h1>
               <p>Por favor, insira suas credenciais para continuar.</p>

               {formType === 'login' && <LoginForm />}
               {formType === 'register' && <RegisterForm />}

               <div className="form-options">
                  {formType === 'login' && <p className="form-option">
                     Não tem uma conta?{' '}
                     <a className="link" href="#" onClick={() => setFormType('register')}>
                        Registre-se
                     </a>
                  </p>}

                  {formType === 'register' && <p className="form-option">
                     Já possui uma conta?{' '}
                     <a className="link" href="#" onClick={() => setFormType('login')}>
                        Fazer Login
                     </a>
                  </p>}
               </div>
            </Card>
         </Container>
      </div>
   );
}
