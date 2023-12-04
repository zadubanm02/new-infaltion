import * as z from "zod"

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  discount: z.number().int(),
  originalPrice: z.number(),
  discountedPrice: z.number(),
  imageUrl: z.string(),
  store: z.string(),
})
