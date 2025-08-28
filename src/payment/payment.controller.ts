import { Controller, Param, Post } from '@nestjs/common';
import { MidtransService } from '../midtrans/midtrans.service';

@Controller('payments')
export class MidtransController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post('create/:cartId')
  async createTransaction(@Param('cartId') cartId: string) {
    return this.midtransService.createTransaction(String(cartId));
  }
}
