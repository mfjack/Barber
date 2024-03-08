import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopItemProps {
   barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
   return (
      <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
         <CardContent className="px-1 py-0">
            <div className="relative w-full h-[159px]">
               <Badge className="absolute opacity-90 top-2 left-2 z-50 flex gap-1 justify-center items-center" variant="secondary">
                  <StarIcon className="fill-primary text-primary" size={12} />
                  <span className="text-xs">5.0</span>
               </Badge>
               <Image
                  className="rounded-2xl pt-1"
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
                  style={{ objectFit: "cover" }}
                  fill
               />
            </div>

            <div className="px-1 pb-3">
               <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
                  {barbershop.name}{" "}
               </h2>
               <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
                  {barbershop.address}
               </p>
               <Button className="w-full mt-3" variant="secondary">
                  Reservar
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};

export default BarbershopItem;
