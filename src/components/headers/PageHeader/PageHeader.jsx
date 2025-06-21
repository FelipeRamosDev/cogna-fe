import { Container } from "@/components/common";
import { parseCSS } from "@/utils/parse";

export default function PageHeader({ title, subtitle, className = '' }) {
   return (
      <div className={parseCSS(className, 'PageHeader')}>
         <Container>
            <h1>{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
         </Container>
      </div>
   );
}
