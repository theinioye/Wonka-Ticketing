import { BaseService } from '@/common/service/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as axios from 'axios';
import { Repository } from 'typeorm';
import { Payments } from '../entities/payment.entity';
import {
  PaystackResponseDto,
  PaystackVerificationResponse,
} from '../dtos/response/paystack-response.dto';
import { UserPresentationService } from '@/user/presentation-services/user.presentation-service';

@Injectable()
export class PaymentsPresentationService extends BaseService {
  private readonly PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
  private readonly PAYSTACK_BASE_URL = 'https://api.paystack.co';
  constructor(
    @InjectRepository(Payments)
    private readonly paymentRepo: Repository<Payments>,
    private readonly userService: UserPresentationService,
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
    const user = await this.userService.db.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const payment = this.paymentRepo.create({
      reference: response.data.data.reference,
      amount,
      status: 'pending',
      email,
      user,
    });
    await this.paymentRepo.save(payment);

    return response.data;
  }

  isValidPaystackResponse(
    response: any,
  ): response is PaystackVerificationResponse {
    return (
      response &&
      typeof response === 'object' &&
      response.data?.status !== undefined
    );
  }

  async verifyPayment(reference: string) {
    const response = await axios.get(
      `${this.PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${this.PAYSTACK_SECRET}` },
      },
    );
    if (this.isValidPaystackResponse(response.data)) {
      const payment = await this.paymentRepo.findOne({ where: { reference } });

      if (payment) {
        response.data.data.status = payment.status;

        await this.paymentRepo.save(payment);
      }

      return response.data;
    } else {
      throw new Error('Invalid Paystack response structure');
    }
  }
}
