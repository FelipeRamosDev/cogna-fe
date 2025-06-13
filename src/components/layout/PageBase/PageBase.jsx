import { HeaderBase } from "@/components/headers";

export default function PageBase({ children }) {
   return (
      <main className="PageBase">
         <HeaderBase />
         {children}
      </main>
   );
}
