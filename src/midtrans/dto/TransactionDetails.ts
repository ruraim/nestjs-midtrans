import { z } from "zod";

export const TransactionDetailsSchema = z.object({
    order_id: z.string(),
    gross_amount: z.number()
})

export type TransactionDetails = z.infer<typeof TransactionDetailsSchema>