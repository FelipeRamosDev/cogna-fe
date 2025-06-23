import { HeaderBase } from "@/components/headers";
import { AuthProvider } from "@/providers/AuthContext";

/**
 * Renders the base layout structure for a page, including the header and page content.
 *
 * Wraps the page with a consistent header (`HeaderBase`) and renders the provided children below it.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} [props.useAuthentication=false] - If true, wraps the page in an `AuthProvider` for authentication context.
 * @param {boolean} [props.redirectLogin=true] - If true, redirects to the login page if the user is not authenticated.
 * @param {boolean} [props.notAuthRender=false] - If true, allows rendering of the page content even when not authenticated.
 * @param {boolean} [props.renderIfLoading=false] - If true, renders the page content even while authentication is loading.
 * @param {boolean} [props.noMarginHeader=false] - If true, removes the bottom margin from the header.
 * @param {React.ReactNode} props.children - The content to be displayed within the page layout.
 *
 * @returns {JSX.Element} A structured layout with a header and dynamic page content.
 */
export default function PageBase({
   useAuthentication = false,
   redirectLogin = true,
   notAuthRender = false,
   renderIfLoading = false,
   noMarginHeader = false,
   children
}) {
   if (useAuthentication) {
      return (
         <AuthProvider
            spinnerHeight="98vh"
            notAuthRender={notAuthRender}
            redirectLogin={redirectLogin}
            renderIfLoading={renderIfLoading}
         >
            <div className="PageBase">
               <HeaderBase noBottomMargin={noMarginHeader} />
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
