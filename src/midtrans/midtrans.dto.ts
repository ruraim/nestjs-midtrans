import { z } from "zod";

// base object

const TransactionDetails = z.object({
    order_id: z.string(),
    gross_amount: z.number()
})

const BillingAddress = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
    country_code: z.string(),
})

const ShippingAddress = BillingAddress

const CustomerDetails = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    billing_address: z.array(BillingAddress),
    shipping_address: z.array(ShippingAddress)
}).deepPartial()

const SellerDetails = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    url: z.string(),
    address: z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        postal_code: z.string(),
        country_code: z.string(),
    })
}).deepPartial()

const ItemDetails = z.array(z.object({
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
}))

const CustomExpiry = z.object({
    order_time: z.string(),
    expiry_duration: z.number(),
    unit: z.string()
})

// payment method

export const CreditCard = z.object({
    token_id: z.string(),
    bank: z.string().nullish(),
    installment_term: z.number().nullish(),
    bins: z.array(z.string()).nullish(),
    type: z.string().nullish(),
    save_token_id: z.boolean().nullish()
})

export const BankTransfer = z.object({
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

export const QRIS = z.object({
    acquirer: z.string().nullish(),
})

// transaction

const PaymentType = z.enum(['credit_card', 'bank_transfer', 'qris', 'direct_debit', 'cstore'])

const ChargeSchema = z.intersection(
    z.object({
        payment_type: PaymentType,
        transaction_details: TransactionDetails,
        item_details: ItemDetails,
        customer_details: CustomerDetails,
        custom_expiry: CustomExpiry.nullish(),
        metadata: z.record(z.string(), z.any()).nullish(),
        credit_card: CreditCard.nullish(),
        bank_transfer: BankTransfer.nullish(),
        qris: QRIS.nullish(),
    }),
    z.record(z.string(), z.any()).nullish()
)

export type Charge = z.infer<typeof ChargeSchema>
