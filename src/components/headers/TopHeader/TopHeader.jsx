import { Container } from "@/components/common";
import { TopNavigation } from "@/components/menus";
import Link from "next/link";

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
