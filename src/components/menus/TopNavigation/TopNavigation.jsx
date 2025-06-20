import { Button } from '@/components/common';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/providers/AuthContext';

/**
 * Renders the top-level navigation menu.
 *
 * Currently includes a link to the home page. Can be extended with additional navigation links.
 *
 * @component
 * @returns {JSX.Element} A navigation element with primary site links.
 */
export default function TopNavigation() {
   const auth = useAuth();
   const user = auth?.user;
   const loading = auth?.loading;

   return (
      <nav>
         <Link href="/" >Home</Link>
         {user && <Link href="/produto/importar">Importar</Link>}

         {!user && <Link href="/login">
            <Button title="Login da conta" color="tertiary">Login</Button>
         </Link>}
      </nav>
   );
}
