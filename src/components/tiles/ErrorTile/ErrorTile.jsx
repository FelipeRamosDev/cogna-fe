import { Card } from "@/components/common";

export default function ErrorTile({ error }) {
   if (!error || !error.message) {
      return null;
   }

   return (
      <Card className="ErrorTile" elevation="s" radius="s" padding="s">
         <p className="error-message">{error.message}</p>
      </Card>
   );
}
