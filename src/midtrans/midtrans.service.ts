// midtrans.service.ts
import { Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';

@Injectable()
export class MidtransService {
  private snap: midtransClient.Snap;

  constructor() {
    this.snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
  }

async createTransaction(params: any) {
  const transaction = await this.snap.createTransaction({
    ...params,
    callbacks: {
      finish: `${process.env.APP_URL}/order`,
      unfinish: `${process.env.APP_URL}/midtrans/unfinish`,
      error: `${process.env.APP_URL}/midtrans/error`,
    },
  });

  return transaction;
}
}
