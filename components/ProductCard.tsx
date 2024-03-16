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
    <Card className="w-[175px] border-none rounded-lg cursor-pointer mr-4 mb-4 shadow-none relative">
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
        <span className="text-xs flex flex-row">
          Before: <p className="ml-2 font-bold">{originalPrice} €</p>
        </span>
        <span className="text-sm flex flex-row">
          Now: <p className="ml-2 font-bold">{discountedPrice} €</p>
        </span>
      </CardContent>
      {store === "Tesco" ? (
        <span className="absolute top-1 right-1 text-sm flex flex-row font-bold bg-white rounded-md p-1 dark:text-primary-foreground">
          <p className="text-red-600 underline decoration-indigo-500 decoration-2">
            T
          </p>
          esco
        </span>
      ) : (
        <span className="absolute top-1 right-1 text-sm flex flex-row font-bold text-red-600">
          Kaufland
        </span>
      )}
      <span className="absolute top-1 left-1 text-sm flex flex-row font-bold bg-white rounded-md p-1 text-red-600">
        -{discount}%
      </span>
    </Card>
  );
};

export default ProductCard;
