import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export const Header = () => {
   return (
      <Card>
         <CardContent className="p-5 flex justify-between flex-row items-center">
            <Image src="/logo.svg" alt="Logo" width={120} height={22} />
            <Button variant="outline" size={"icon"}>
               <MenuIcon />
            </Button>
         </CardContent>
      </Card>
   );
}
