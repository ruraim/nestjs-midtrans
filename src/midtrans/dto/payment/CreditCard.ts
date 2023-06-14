import { z } from "zod";

export const CreditCardSchema = z.object({
    token_id: z.string(),
    bank: z.string().nullish(),
    installment_term: z.number().nullish(),
    bins: z.array(z.string()).nullish(),
    type: z.string().nullish(),
    save_token_id: z.boolean().nullish()
})

export type CreditCard = z.infer<typeof CreditCardSchema>