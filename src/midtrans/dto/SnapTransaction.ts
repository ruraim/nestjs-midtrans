import { z } from 'zod'
import { CustomerDetailsSchema } from './CustomerDetails'
import { ItemDetailsSchema } from './ItemDetails'
import { TransactionDetailsSchema } from './TransactionDetails'

export const SnapTransactionSchema = z.intersection(
    z.object({
        transaction_details: TransactionDetailsSchema,
        item_details: ItemDetailsSchema.nullish(),
        customer_details: CustomerDetailsSchema.nullish(),
        enabled_payments: z.array(
            z.enum([
                "credit_card", "cimb_clicks",
                "bca_klikbca", "bca_klikpay", "bri_epay", "echannel", "permata_va",
                "bca_va", "bni_va", "bri_va", "cimb_va", "other_va", "gopay", "indomaret",
                "danamon_online", "akulaku", "shopeepay", "kredivo", "uob_ezpay"
            ])
        ).nullish(),
        credit_card: z.record(z.string(), z.any()).nullish(),
        bca_va: z.record(z.string(), z.any()).nullish(),
        bni_va: z.record(z.string(), z.any()).nullish(),
        bri_va: z.record(z.string(), z.any()).nullish(),
        cimb_va: z.record(z.string(), z.any()).nullish(),
        permata_va: z.record(z.string(), z.any()).nullish(),
        shopeepay: z.record(z.string(), z.any()).nullish(),
        gopay: z.record(z.string(), z.any()).nullish(),
        uob_ezpay: z.record(z.string(), z.any()).nullish(),
        callbacks: z.object({
            finish: z.string(),
        }).nullish(),
        expiry: z.object({
            start_time: z.string().nullish(),
            unit: z.enum(["day", "hour", "minute"]),
            duration: z.number()
        }).nullish(),
        page_expiry: z.object({
            duration: z.number(),
            unit: z.enum(["day", "hour", "minute"])
        }).nullish()
    }),
    z.record(z.string(), z.any()).nullish()
)

export type SnapTransaction = z.infer<typeof SnapTransactionSchema>