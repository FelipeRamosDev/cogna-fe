import { Button, Card, Container } from '@/components/common';
import { useAuth } from '@/providers/AuthContext';
import { useEffect, useState } from "react";
import { ProductsGrid } from '@/components/grids';
import { PageHeader } from '@/components/headers';
import AJAX from '@/services/AJAX';
import Link from 'next/link';

export default function MyProfileContent() {
   const [ products, setProducts ] = useState([]);
   const { user, logout } = useAuth();
   const ajax = AJAX();

   useEffect(() => {
      ajax.get('/').then(response => {
         if (!response.data.success) {
            throw response.data;
         }

         setProducts(response.data.products);
      }).catch((err) => {
         console.error(err);
      });
   }, []);  

   return (
      <div className="MyProfileContent">
         <PageHeader title="Meu Perfil" subtitle="Aqui você pode gerenciar seus produtos e editar seu perfil." />

         <Container>
            <div className="page-content">
               <div className="content">
                  <div className="content-header">
                     <div className="content-title-container">
                        <h2 className="content-title">Meus Produtos</h2>
                        <p className="content-description">Veja abaixo os produtos que você tem cadastrado e gerencia eles aqui.</p>
                     </div>

                     <div className="content-actions">
                        <Link href="/produto/importar">
                           <Button title="Importar Produtos" color="primary">Importar</Button>
                        </Link>
                        <Link href="/produto/criar">
                           <Button title="Criar Novo Produto" color="tertiary">Novo</Button>
                        </Link>
                     </div>
                  </div>

                  <ProductsGrid products={products} />
               </div>
               
               <div className="sidebar">
                  <Card className="profile-card">
                     <h3 className="card-title">Meus dados</h3>

                     <div className="profile-field">
                        <label>ID:</label>
                        <p>{user.id}</p>
                     </div>
                     <div className="profile-field">
                        <label>Nome:</label>
                        <p>{user.name}</p>
                     </div>
                     <div className="profile-field">
                        <label>E-mail:</label>
                        <p>{user.email}</p>
                     </div>
                  </Card>

                  <Card className="profile-card">
                     <Button title="Sair da conta" color="error" fullwidth onClick={logout}>
                        Sair da Conta
                     </Button>
                  </Card>
               </div>
            </div>
         </Container>
      </div>
   );
}
