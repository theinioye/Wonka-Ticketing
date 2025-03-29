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
import { InitializePaymentDto } from '../dtos/input/payment-input.dto';

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

  public db = this.paymentRepo;

  async initializePayment(data: InitializePaymentDto) {
    const { amount, email, callBackUrl, userId, quantity, ...rest } = data;
    const response = await axios.post<PaystackResponseDto>(
      `${this.PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Convert to kobo
        callback_url: callBackUrl,
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
      quantity,
      category: {
        id: rest.categoryId,
      },
      event: {
        id: rest.eventId,
      },
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
        payment.status = response.data.data.status;

        await this.paymentRepo.save(payment);
      }

      return response.data;
    } else {
      throw new Error('Invalid Paystack response structure');
    }
  }
}
