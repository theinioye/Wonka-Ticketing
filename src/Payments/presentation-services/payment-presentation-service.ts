import { BaseService } from '@/common/service/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as axios from 'axios';
import { Repository } from 'typeorm';
import { Payments } from '../entities/payment.entity';
import { PaystackResponseDto } from '../dtos/response/paystack-response.dto';

// interface PaystackResponse {
//   status: boolean;
//   message: string;
//   data: {
//     authorization_url: string;
//     access_code: string;
//     reference: string;
//   };
// }
@Injectable()
export class PaymentsPresentationService extends BaseService {
  private readonly PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
  private readonly PAYSTACK_BASE_URL = 'https://api.paystack.co';

  constructor(
    @InjectRepository(Payments)
    private readonly paymentRepo: Repository<Payments>,
  ) {
    super();
  }

  async initializePayment(
    email: string,
    amount: number,
    userId: string,
    callbackUrl: string,
  ) {
    const response = await axios.post<PaystackResponseDto>(
      `${this.PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Convert to kobo
        callback_url: callbackUrl,
        currency: 'NGN',
      },
      {
        headers: {
          Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const payment = this.paymentRepo.create({
      reference: response.data.data.reference,
      amount,
      status: 'pending',
      email,
      user: { id: userId },
    });
    await this.paymentRepo.save(payment);

    return response.data;
  }

  async verifyPayment(reference: string) {
    const response = await axios.get<PaystackResponseDto>(
      `${this.PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${this.PAYSTACK_SECRET}` },
      },
    );

    const payment = await this.paymentRepo.findOne({ where: { reference } });

    if (payment) {
      if (response.data.status) {
        payment.status = 'success';
      } else {
        payment.status = 'failed';
      }
      await this.paymentRepo.save(payment);
    }

    return response.data;
  }
}
