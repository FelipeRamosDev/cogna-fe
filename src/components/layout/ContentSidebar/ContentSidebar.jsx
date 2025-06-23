import { parseCSS } from "@/utils/parse";

export default function ContentSidebar({ reverseColumn, reverseRow, className, children = [] }) {
   const classeNames = parseCSS(className, [
      'ContentSidebar',
      reverseColumn ? 'reverse-column' : '',
      reverseRow ? 'reverse-row' : ''
   ]);

   return (
      <div className={classeNames}>
         <div className="content">
            {children[0] || null}
         </div>

         <div className="sidebar">
            {children[1] || null}
         </div>
      </div>
   );
}
