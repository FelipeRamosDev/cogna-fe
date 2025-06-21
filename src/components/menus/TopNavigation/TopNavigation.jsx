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
   const { user, logout } = useAuth();

   return (
      <nav className={parseCSS(className, 'TopNavigation')}>
         <Link className="menu-link" href="/" >Home</Link>
         {user && <Link className="menu-link" href="/produto/importar">Importar</Link>}

         {!user && <Link href="/login">
            <Button title="Login da conta" color="tertiary">Login</Button>
         </Link>}

         {user && (
            <Button title="Sair da conta" color="error" onClick={logout}>Sair</Button>
         )}
      </nav>
   );
}
