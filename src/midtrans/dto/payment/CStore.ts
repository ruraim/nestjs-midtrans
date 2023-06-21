import { z } from "zod";

export const CStoreSchema = z.object({
    store: z.enum(['alfamart', 'indomaret']),
    message: z.string().nullish(),
    alfamart_free_text_1: z.string().nullish(),
    alfamart_free_text_2: z.string().nullish(),
    alfamart_free_text_3: z.string().nullish()
})

export type CStore = z.infer<typeof CStoreSchema>