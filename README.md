# NestJS Midtrans
<a href="https://www.npmjs.com/package/@ruraim/nestjs-midtrans" target="_blank"><img src="https://img.shields.io/npm/v/@ruraim/nestjs-midtrans.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@ruraim/nestjs-midtrans" target="_blank"><img src="https://img.shields.io/npm/l/@ruraim/nestjs-midtrans.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@ruraim/nestjs-midtrans" target="_blank"><img src="https://img.shields.io/npm/dm/@ruraim/nestjs-midtrans.svg" alt="NPM Downloads" /></a>
## Description

Midtrans API Wrapper for Nest JS, with this package you can easily integrate your Nest JS application with Midtrans Payment Gateway. Using [zod](https://github.com/colinhacks/zod) for schema validation so you can import the schema and use it for validation in your application.

## Status
### Under Development
This package is still under development, so there are still many features that are not available yet. Will be stable on version 1.0.0

## Table of Contents
- [Setup & Installation](#setup--installation)
  - [Installation](#installation)
  - [Module Import](#module-import)
  - [Inject Service](#inject-service)
- [Transaction](#transaction)
    - [Charge Transaction](#charge-transaction)
    - [Check Transaction Status](#check-transaction-status)
    - [Expire Transaction](#expire-transaction)
- [Subscription](#subscription)
  - [Create Subscription](#create-subscription)
  - [Get Subscription](#get-subscription)
  - [Disable Subscription](#disable-subscription)
  - [Enable Subscription](#enable-subscription)
  - [Update Subscription](#update-subscription)
- [References](#references)
- [Support](#support)
- [Stay in touch](#stay-in-touch)
- [License](#license)

# Setup & Installation
## Installation
**Using NPM**

```bash
$ npm i --save @ruraim/nestjs-midtrans
```
**Using Yarn**

```bash
$ yarn add @ruraim/nestjs-midtrans
```
---

## Module Import

```typescript
import { Module } from '@nestjs/common';
import { MidtransModule } from '@ruraim/nestjs-midtrans';

// using register method
@Module({
  imports: [
      MidtransModule.register({
        clientKey: 'client-key',
        serverKey: 'server-key',
        merchantId: 'merchant-id',
        sandbox: true, // default: false,
        isGlobal: true // default: false, register module globally
      })
    ],
})

// using registerAsync with dependencies
@Module({
  imports: [
      MidtransModule.registerAsync({
          useFactory: (config: ConfigService) => ({
              clientKey: config.get<string>('MIDTRANS_CLIENT_KEY'),
              serverKey: config.get<string>('MIDTRANS_SERVER_KEY'),
              merchantId: config.get<string>('MIDTRANS_MERCHANT_ID'),
              sandbox: config.get<string>('MIDTRANS_MODE') === 'sandbox',
          }),
          // using ConfigService from @nestjs/config to get .env value
          inject: [ConfigService],
          imports: [ConfigModule],
          isGlobal: true // default: false, register module globally
      })
    ],
})
export class AppModule {}
```
---

## Inject Service

```typescript

import { MidtransService } from '@ruraim/nestjs-midtrans';

@Injectable()
export class AppService {
    constructor(
        private readonly midtransService: MidtransService
    ) {}
}
```

# Transaction
## Charge Transaction
You can refer to [Midtrans - Charge Transaction](https://docs.midtrans.com/reference/charge-transactions-1) for more information about the payload or see [Charge Schema](src/midtrans/dto/Charge.ts) file in the source code.

```typescript
  const result = await this.midtransService.charge({
      payment_type: 'bank_transfer',
      transaction_details: {
          order_id: 'ORDER-ID-123',
          gross_amount: 200000
      },
      customer_details: {
          email: 'customer@gmail.com',
          first_name: 'John Doe',
          phone: '081234567890'
      },
      item_details: [
        {
          id: 'Item1',
          price: 100000,
          quantity: 1,
          name: 'Item 1'
        },
        {
          id: 'Item2',
          price: 50000,
          quantity: 2,
          name: 'Item 2'
        }
      ],
      bank_transfer: {
        bank: 'bca'
      }
  })
  console.log(result)
```
---

## Check Transaction Status
```typescript
  const result = await this.midtransService.getStatus('ORDER-ID-123')
  console.log(result)
```
---

## Expire Transaction
```typescript
  const result = await this.midtransService.expireTransaction('ORDER-ID-123')
  console.log(result)
```

# Subscription
## Create Subscription
You can refer to [Midtrans - Create Subscription](https://docs.midtrans.com/reference/create-subscription) for more information about the payload or see [Create Subscription Schema](src/midtrans/dto/subscription/Subscription.ts) file in the source code.

```typescript
  const result = await this.midtransService.createSubscription({
    name: 'Langganan bulanan',
    amount: 10000,
    currency: 'IDR',
    payment_type: 'credit_card',
    schedule: {
      interval: 1,
      interval_unit: 'month',
      max_interval: 12,
      start_time: '2023-07-15 00:00:00'
    },
    token: 'dummy_credit_card_token',
  })
  console.log(result)
```
---

## Get Subscription
```typescript
  const result = await this.midtransService.getSubscription('SUBSCRIPTION-ID-123')
  console.log(result)
```
---

## Disable Subscription
```typescript
  const result = await this.midtransService.disableSubscription('SUBSCRIPTION-ID-123')
  console.log(result)
```
---

## Enable Subscription
```typescript
  const result = await this.midtransService.enableSubscription('SUBSCRIPTION-ID-123')
  console.log(result)
```
---

## Update Subscription
```typescript
  const result = await this.midtransService.updateSubscription('4b9273ae-8bfa-4400-94fe-ba4b2b4af70f', {
      name: 'Langganan bulanan',
      amount: 50000,
      currency: 'IDR',
      token: 'dummy_credit_card_token'
  })
  console.log(result)
```

# References
- [Midtrans Official Documentation](https://docs.midtrans.com/)
- [Nest JS Official Documentation](https://docs.nestjs.com/)

# Support
If you like this package, you can support me by:
- Star this repository
- Contribute to this repository
- [Donate via Trakteer](https://trakteer.id/ruraim)

# Stay in touch
If you have any question, feel free to contact me on:
- [WhatsApp](https://wa.me/087748833087)
- [Telegram](https://t.me/ruraim)

# License

[MIT licensed](LICENSE).
