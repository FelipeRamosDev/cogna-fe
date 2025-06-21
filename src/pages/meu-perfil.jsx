import { MyProfileContent } from "@/components/content";
import { PageBase } from "@/components/layout";

export default function MyProfile() {
   return (
      <PageBase className="MyProfile" useAuthentication noMarginHeader>
         <MyProfileContent />
      </PageBase>
   );
}