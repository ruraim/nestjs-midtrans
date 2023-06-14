import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';

@Module({
  providers: [MidtransService]
})
export class MidtransModule {}
