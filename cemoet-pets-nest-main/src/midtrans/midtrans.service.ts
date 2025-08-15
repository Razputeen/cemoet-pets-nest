import { Injectable } from '@nestjs/common';
const midtransClient = require('midtrans-client');

@Injectable()
export class MidtransService {
  private snap: any;

  constructor() {
    this.snap = new midtransClient.Snap({
      isProduction: process.env.NODE_ENV === 'production',
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }

  async createTransaction(payload: {
    order_id: string;
    gross_amount: number;
    items?: any[];
    customer?: any;
  }) {
    const parameter = {
      transaction_details: {
        order_id: payload.order_id,
        gross_amount: payload.gross_amount,
      },
      item_details: payload.items ?? [],
      customer_details: payload.customer ?? {},
    };

    // createTransaction() mengembalikan objek yang berisi token dan redirect_url
    const response = await this.snap.createTransaction(parameter);
    return response; // { token: '...', redirect_url: '...' }
  }
}
