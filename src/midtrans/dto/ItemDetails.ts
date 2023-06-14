import { z } from "zod";

export const ItemSchema = z.object({
    id: z.string().nullish(),
    price: z.number(),
    quantity: z.number(),
    name: z.string(),
    brand: z.string().nullish(),
    category: z.string().nullish(),
    merchant_name: z.string().nullish(),
    tenor: z.number().nullish(),
    code_plan: z.string().nullish(),
    mid: z.string().nullish(),
    url: z.string().nullish()
})

export const ItemDetailsSchema = z.array(ItemSchema)

export type Item = z.infer<typeof ItemSchema>
export type ItemDetails = z.infer<typeof ItemDetailsSchema>