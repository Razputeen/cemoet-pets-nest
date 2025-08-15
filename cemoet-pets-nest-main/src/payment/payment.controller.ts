import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { MidtransService } from '../midtrans/midtrans.service';
import * as crypto from 'crypto';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly midtrans: MidtransService) {}

  @Post('create')
  async create(@Body() body, @Res() res) {
    // body: { order_id, gross_amount, items, customer }
    const result = await this.midtrans.createTransaction(body);
    return res.json(result); // kirim token & redirect_url ke client
  }

  // Endpoint untuk menerima notification dari Midtrans (webhook)
  @Post('notification')
  async notification(@Req() req, @Res() res) {
    const notif = req.body;

    // verifikasi signature: SHA512(order_id + status_code + gross_amount + serverKey)
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const signatureString = `${notif.order_id}${notif.status_code}${notif.gross_amount}${serverKey}`;
    const computed = crypto.createHash('sha512').update(signatureString).digest('hex');

    if (computed !== notif.signature_key) {
      return res.status(400).send('invalid signature');
    }

    // sekarang proses status: notif.transaction_status (capture, settle, pending, deny, cancel, expire)
    // contoh sederhana:
    const txStatus = notif.transaction_status;
    const orderId = notif.order_id;
    // update DB sesuai txStatus...

    return res.status(200).send('OK');
  }
}
