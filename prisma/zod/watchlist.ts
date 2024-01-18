import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteItem, relatedItemSchema } from "./index"

export const watchlistSchema = z.object({
  id: z.string(),
  userId: z.string(),
})

export interface CompleteWatchlist extends z.infer<typeof watchlistSchema> {
  user: CompleteUser
  items: CompleteItem[]
}

/**
 * relatedWatchlistSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWatchlistSchema: z.ZodSchema<CompleteWatchlist> = z.lazy(() => watchlistSchema.extend({
  user: relatedUserSchema,
  items: relatedItemSchema.array(),
}))
