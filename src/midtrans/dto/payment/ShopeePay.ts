import { z } from 'zod'

export const ShopeePaySchema = z.object({
    callback_url: z.string().nullish(),
})

export type ShopeePay = z.infer<typeof ShopeePaySchema>