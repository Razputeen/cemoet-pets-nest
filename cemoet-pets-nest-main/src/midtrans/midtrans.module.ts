import { Module } from '@nestjs/common';
import { MidtransController } from '../payment/payment.controller';
import { MidtransService } from './midtrans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '#/cart/entities/cart.entity';
import { CartModule } from '#/cart/cart.module';

@Module({
  providers: [MidtransService],
  exports: [MidtransService],
})
export class MidtransModule {}
