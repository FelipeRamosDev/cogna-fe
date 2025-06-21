import { Container } from "@/components/common";
import { TopNavigation } from "@/components/menus";
import { AuthProvider, useAuth } from "@/providers/AuthContext";
import { parseCSS } from "@/utils/parse";
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
export default function HeaderBase({ className = '', noBottomMargin = false }) {
   const auth = useAuth();
   const user = auth?.user;
   const classes = parseCSS(className, [
      'TopHeader',
      noBottomMargin ? 'no-bottom-margin' : '',
   ]);

   return (
      <header className={classes}>
         <Container>
            <Link href="/" className="logo">
               <span>CognaShop</span>
            </Link>

            <AuthProvider loadedUser={user} renderIfLoading>
               <TopNavigation />
            </AuthProvider>
         </Container>
      </header>
   );
}
