import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { ConfigurableModuleClass } from './midtrans.module-definition';
import { SnapService } from './snap.service';

@Module({
  providers: [MidtransService, SnapService],
  exports: [MidtransService, SnapService],
})
export class MidtransModule extends ConfigurableModuleClass { }
