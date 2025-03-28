import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/service/base.service';
import { PaymentsPresentationService } from '../../payments/presentation-services/payment-presentation-service';
import { UserPresentationService } from '../../user/presentation-services/user.presentation-service';
import { Tickets } from '../entities/tickets.entity';
import { EventPresentationService } from './event-presentation-service';
import { CreateTicketDto } from '../dto/input/create-ticket.dto';
import { InitializeTicketResponseDto } from '../dto/response/ticket-response.dto';

@Injectable()
export class TicketPresentationService extends BaseService {
  constructor(
    @InjectRepository(Tickets)
    private readonly repo: Repository<Tickets>,
    private readonly eventService: EventPresentationService,
    private readonly paymentService: PaymentsPresentationService,
    private readonly userService: UserPresentationService,
  ) {
    super();
  }
  db = this.repo;

  async initializeTicket(data: CreateTicketDto) {
    const { eventId, categoryId, quantity, user } = data;
    const event = await this.eventService.db.findOne({
      where: { id: eventId },
      relations: ['categories'],
    });

    const category = event.categories.find(
      (category) => category.id === categoryId,
    );
    const price = category.price;
    const amount = Number(price) * Number(quantity);
    const userId = user.id;

    const checkUser = await this.userService.db.findOne({
      where: { id: userId },
    });

    const email = checkUser.email;
    const callBackUrl = 'URL_ADDRESS:3000/payments/verify';

    const paymentInfo = {
      email,
      amount,
      userId: user.id,
      quantity,
      eventId: event.id,
      categoryId: category.id,
      callBackUrl,
    };

    const paymentResponse =
      await this.paymentService.initializePayment(paymentInfo);

    return {
      message: `Payment of amount:${amount} initialized successfully`,
      ...paymentResponse,
    } as InitializeTicketResponseDto;
  }

  async verifyTicket(reference: string) {
    const verifification = await this.paymentService.verifyPayment(reference);
    const { data } = verifification;
    const status = data.status;
    if (status !== 'success') {
      return {
        message: 'Payment failed',
        reference,
      };
    }
    const payment = await this.paymentService.db.findOne({
      where: { reference },
      relations: ['user', 'event', 'category'],
    });

    if (data.amount !== payment.amount * 10) {
      return {
        message: 'Payment failed: Inaccurate amount',
        verifification,
      };
    }

    const event = await this.eventService.db.findOne({
      where: { id: payment.event.id },
      relations: ['categories'],
    });

    if (!event) {
      return { message: 'Event does not exist', verifification };
    }

    const category = event.categories.find(
      (category) => category.id === payment.category.id,
    );
    if (!category) {
      return { message: 'Category does not exist', verifification };
    }

    const quantity = payment.quantity;
    const userId = payment.user.id;
    const tickets: Tickets[] = [];

    for (let i = 0; i < Number(quantity); i++) {
      const ticket = this.repo.create({
        event: { id: event.id },
        category: { id: category.id },
        user: { id: userId },
      });
      tickets.push(ticket);
    }

    await this.repo.save(tickets);

    return tickets;
  }
}
