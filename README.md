# NestJS Midtrans
<a href="https://www.npmjs.com/package/@ruraim/nestjs-midtrans" target="_blank"><img src="https://img.shields.io/npm/v/@ruraim/nestjs-midtrans.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@ruraim/nestjs-midtrans" target="_blank"><img src="https://img.shields.io/npm/l/@ruraim/nestjs-midtrans.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@ruraim/nestjs-midtrans" target="_blank"><img src="https://img.shields.io/npm/dm/@ruraim/nestjs-midtrans.svg" alt="NPM Downloads" /></a>
## Description

Midtrans SDK Wrapper for Nest JS

## Installation
**Using NPM**

```bash
$ npm i --save @ruraim/nestjs-midtrans
```
**Using Yarn**

```bash
$ yarn add @ruraim/nestjs-midtrans
```

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
        sandbox: true, // default: false
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
          imports: [ConfigModule]
      })
    ],
})
export class AppModule {}
```

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

## Charge Transaction Example
You can refer to [Midtrans - Charge Transaction](https://docs.midtrans.com/reference/charge-transactions-1) for more information about the payload or see [Charge Schema](src/midtrans/dto/Charge.ts) file in the source code.

```typescript
  const result = await this.midtransService.charge({
      payment_type: 'bank_transfer',
      transaction_details: {
          order_id: 'ORDER-123',
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

## Check Transaction Status Example
```typescript
  const result = await this.midtransService.getStatus('ORDER-123')
  console.log(result)
```

## Support
- [Midtrans Official Documentation](https://docs.midtrans.com/)

## Stay in touch

- [WhatsApp](https://wa.me/087748833087)
- [Telegram](https://t.me/ruraim)

## License

[MIT licensed](LICENSE).
