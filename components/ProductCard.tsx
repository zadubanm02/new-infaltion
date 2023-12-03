import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import Image from "next/image";

type ProductCardProps = {
  name: string;
  imageUrl?: string;
  priceBefore: number;
  priceAfter: number;
  discount: number;
  store: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  priceAfter,
  priceBefore,
  store,
  discount,
}) => {
  return (
    <Card className="w-[150px] border-none rounded-lg cursor-pointer mr-4 mb-4">
      <CardHeader className="p-0">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={
              imageUrl
                ? imageUrl
                : "https://cdnweb.anghami.com/web/assets/img/placeholders/playlist-placeholder.png"
            }
            alt={name}
            width={150}
            height={150}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105 rounded-lgs",
              "aspect-square"
            )}
          />
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <p className="font-semibold">{name}</p>
        <p className="text-xs">Before: {priceBefore}</p>
        <p className="text-xs">Now: {priceAfter}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
