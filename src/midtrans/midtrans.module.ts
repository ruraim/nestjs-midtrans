import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { ConfigurableModuleClass } from './midtrans.module-definition';

@Module({
  providers: [MidtransService],
  exports: [MidtransService],
})
export class MidtransModule extends ConfigurableModuleClass { }
