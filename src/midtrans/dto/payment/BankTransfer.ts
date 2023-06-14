import { z } from "zod";

export const BankTransferSchema = z.object({
    bank: z.string(),
    va_number: z.string().nullish(),
    free_text: z.object({
        inquiry: z.array(z.object({
            en: z.string(),
            id: z.string()
        })).nullish(),
        payment: z.array(z.object({
            en: z.string(),
            id: z.string()
        })).nullish()
    }).nullish(),
    bca: z.object({
        sub_company_code: z.string().nullish()
    }).nullish(),
    permata: z.object({
        recipient_name: z.string().nullish()
    }).nullish()
})

export type BankTransfer = z.infer<typeof BankTransferSchema>