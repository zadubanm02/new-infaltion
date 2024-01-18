import * as z from "zod"
import { CompleteSubscription, relatedSubscriptionSchema, CompleteWatchlist, relatedWatchlistSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  subscription?: CompleteSubscription | null
  watchlist?: CompleteWatchlist | null
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  subscription: relatedSubscriptionSchema.nullish(),
  watchlist: relatedWatchlistSchema.nullish(),
}))
