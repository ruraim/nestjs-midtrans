import { z } from 'zod'

export const BCAKlikPaySchema = z.object({
    description: z.string(),
    misc_fee: z.number().nullish(),
})

export type BCAKlikPay = z.infer<typeof BCAKlikPaySchema>