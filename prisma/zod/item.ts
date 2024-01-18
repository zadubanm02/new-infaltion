import * as z from "zod"
import { CompleteWatchlist, relatedWatchlistSchema } from "./index"

export const itemSchema = z.object({
  id: z.string(),
  itemName: z.string(),
})

export interface CompleteItem extends z.infer<typeof itemSchema> {
  watchlists: CompleteWatchlist[]
}

/**
 * relatedItemSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedItemSchema: z.ZodSchema<CompleteItem> = z.lazy(() => itemSchema.extend({
  watchlists: relatedWatchlistSchema.array(),
}))
