import { Button } from "@/components/common";
import Link from "next/link";

/**
 * Renders the top-level navigation menu.
 *
 * Currently includes a link to the home page. Can be extended with additional navigation links.
 *
 * @component
 * @returns {JSX.Element} A navigation element with primary site links.
 */
export default function TopNavigation() {
   return (
      <nav>
         <Link href="/" >Home</Link>
         <Link href="/produto/importar">Importar</Link>
         <Link href="/login">
            <Button title="Faça login da sua conta" color="tertiary">Login</Button>
         </Link>
      </nav>
   );
}
