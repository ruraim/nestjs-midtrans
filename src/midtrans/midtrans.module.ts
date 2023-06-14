import { DynamicModule, Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { MidtransConfig } from './midtrans.interface';

@Module({})
export class MidtransModule {
  static register(options: MidtransConfig): DynamicModule {
    return {
      module: MidtransModule,
      providers: [
        {
          provide: 'MIDTRANS_CONFIG',
          useValue: options,
        },
        MidtransService,
      ],
      exports: [MidtransService],
    };
  }

  static registerAsync(options: any): DynamicModule {
    return {
      module: MidtransModule,
      providers: [
        {
          provide: 'MIDTRANS_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        MidtransService,
      ],
      exports: [MidtransService],
    };
  }
}
