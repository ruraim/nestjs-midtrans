import { z } from "zod";
import { TransactionDetailsSchema } from "./TransactionDetails";
import { ItemDetailsSchema } from "./ItemDetails";
import { CustomerDetailsSchema } from "./CustomerDetails";
import { CustomExpirySchema } from "./CustomExpiry";
import { CreditCardSchema } from "./payment/CreditCard";
import { BankTransferSchema } from "./payment/BankTransfer";
import { QRISSchema } from "./payment/QRIS";

export const PaymentTypeSchema = z.enum(['credit_card', 'bank_transfer', 'qris', 'direct_debit', 'cstore'])

export const ChargeSchema = z.intersection(
    z.object({
        payment_type: PaymentTypeSchema,
        transaction_details: TransactionDetailsSchema,
        item_details: ItemDetailsSchema,
        customer_details: CustomerDetailsSchema,
        custom_expiry: CustomExpirySchema.nullish(),
        metadata: z.record(z.string(), z.any()).nullish(),
        credit_card: CreditCardSchema.nullish(),
        bank_transfer: BankTransferSchema.nullish(),
        qris: QRISSchema.nullish(),
    }),
    z.record(z.string(), z.any()).nullish()
)

export type PaymentType = z.infer<typeof PaymentTypeSchema>
export type Charge = z.infer<typeof ChargeSchema>
