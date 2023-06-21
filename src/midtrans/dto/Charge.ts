import { z } from "zod";
import { TransactionDetailsSchema } from "./TransactionDetails";
import { ItemDetailsSchema } from "./ItemDetails";
import { CustomerDetailsSchema } from "./CustomerDetails";
import { CustomExpirySchema } from "./CustomExpiry";
import { CreditCardSchema } from "./payment/CreditCard";
import { BankTransferSchema } from "./payment/BankTransfer";
import { QRISSchema } from "./payment/QRIS";
import { GopaySchema } from "./payment/Gopay";
import { CStoreSchema } from "./payment/CStore";
import { ShopeePaySchema } from "./payment/ShopeePay";
import { EChannelSchema } from "./payment/EChannel";
import { BCAKlikPaySchema } from "./payment/BCAKlikPay";
import { KlikBCASchema } from "./payment/KlikBCA";
import { CIMBOctoClickSchema } from "./payment/CIMBOctoClick";
import { UOBEzpaySchema } from "./payment/UOBEzpay";

export const PaymentTypeSchema = z.enum([
    'credit_card',
    'bank_transfer',
    'qris',
    'direct_debit',
    'cstore',
    'gopay',
    'shopeepay',
    'echannel',
    'bca_klikpay',
    'bca_klikbca',
    'cimb_clicks',
    'uob_ezpay',
])

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
        gopay: GopaySchema.nullish(),
        cstore: CStoreSchema.nullish(),
        shopeepay: ShopeePaySchema.nullish(),
        echannel: EChannelSchema.nullish(),
        bca_klikpay: BCAKlikPaySchema.nullish(),
        bca_klikbca: KlikBCASchema.nullish(),
        cimb_clicks: CIMBOctoClickSchema.nullish(),
        uob_ezpay: UOBEzpaySchema.nullish()
    }),
    z.record(z.string(), z.any()).nullish()
)

export type PaymentType = z.infer<typeof PaymentTypeSchema>
export type Charge = z.infer<typeof ChargeSchema>
