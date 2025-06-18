import { Card, Container } from '@/components/common';
import { Input } from '@/components/inputs';

export default function LoginContent() {
   return (
      <div className="LoginContent">
         <Container>
            <Card className="login-card">
               <h1 className="card-title">Login de Usuário</h1>
               <p>Por favor, insira suas credenciais para continuar.</p>
            </Card>
         </Container>
      </div>
   );
}
