import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import Image from "next/image";
import { productSchema } from "@/prisma/zod";
import { z } from "zod";

type ProductProps = z.infer<typeof productSchema>;

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  discount,
  originalPrice,
  discountedPrice,
  imageUrl,
  store,
}) => {
  return (
    <Card className="w-[175px] border-none rounded-lg cursor-pointer mr-4 mb-4">
      <CardHeader className="p-0">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={
              imageUrl
                ? imageUrl
                : "https://cdnweb.anghami.com/web/assets/img/placeholders/playlist-placeholder.png"
            }
            alt={title}
            width={175}
            height={175}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105 rounded-lgs",
              "aspect-square"
            )}
          />
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <p className="font-semibold">{title}</p>
        <p className="text-xs">Before: {originalPrice}</p>
        <p className="text-xs">Now: {discountedPrice}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
