import { Container } from "@/components/common";
import { TopNavigation } from "@/components/menus";
import Link from "next/link";

/**
 * Renders the base header of the application, including the logo and top navigation menu.
 *
 * The header is wrapped in a Container for consistent layout spacing and includes
 * a link to the homepage and the main navigation component.
 *
 * @component
 * @returns {JSX.Element} The top header section of the app.
 */
export default function HeaderBase() {
   return (
      <header className="TopHeader">
         <Container>
            <Link href="/" className="logo">
               <span>CognaShop</span>
            </Link>

            <TopNavigation />
         </Container>
      </header>
   );
}
