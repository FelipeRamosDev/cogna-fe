import Link from 'next/link';
import { useAuth } from '@/providers/AuthContext';
import { Button } from '@/components/common';
import { parseCSS } from '@/utils/parse';

/**
 * Renders the top-level navigation menu.
 *
 * Currently includes a link to the home page. Can be extended with additional navigation links.
 *
 * @component
 * @returns {JSX.Element} A navigation element with primary site links.
 */
export default function TopNavigation({ className = '' }) {
   const { user } = useAuth();

   return (
      <nav className={parseCSS(className, 'TopNavigation')}>
         <Link className="menu-link" href="/" >Home</Link>
         {!user && <Link href="/login">
            <Button title="Login da conta" color="tertiary">Login</Button>
         </Link>}

         {user && <Link href="/meu-perfil">
            <Button title="Perfil do usuário" color="tertiary">Perfil</Button>
         </Link>}
      </nav>
   );
}
