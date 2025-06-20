import { HeaderBase } from "@/components/headers";
import { AuthProvider } from "@/providers/AuthContext";

/**
 * Renders the base layout structure for a page, including the header and page content.
 *
 * Wraps the page with a consistent header (`HeaderBase`) and renders the provided children below it.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.authProtected - Indicates whether the page requires authentication.
 * @param {React.ReactNode} props.children - The content to be displayed within the page layout.
 *
 * @returns {JSX.Element} A structured layout with a header and dynamic page content.
 */
export default function PageBase({ authProtected, children }) {
   if (authProtected) {
      return (
         <AuthProvider redirectLogin spinnerHeight="98vh">
            <div className="PageBase">
               <HeaderBase />
               {children}
            </div>
         </AuthProvider>
      );
   }

   return (
      <div className="PageBase">
         <HeaderBase />
         {children}
      </div>
   );
}
