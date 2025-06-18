import { HeaderBase } from "@/components/headers";

/**
 * Renders the base layout structure for a page, including the header and page content.
 *
 * Wraps the page with a consistent header (`HeaderBase`) and renders the provided children below it.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed within the page layout.
 *
 * @returns {JSX.Element} A structured layout with a header and dynamic page content.
 */
export default function PageBase({ children }) {
   return (
      <div className="PageBase">
         <HeaderBase />
         {children}
      </div>
   );
}
