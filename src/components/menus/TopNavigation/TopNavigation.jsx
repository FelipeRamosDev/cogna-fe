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
         <Link href="/">Home</Link>
      </nav>
   );
}
