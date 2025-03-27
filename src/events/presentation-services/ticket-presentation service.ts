import { BaseService } from '@/common/service/base.service';
import { PaymentsPresentationService } from '@/payments/presentation-services/payment-presentation-service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventPresentationService } from './event-presentation-service';
import { Tickets } from '../entities/tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from '../dto/input/create-ticket.dto';
import { UserPresentationService } from '@/user/presentation-services/user.presentation-service';

@Injectable()
export class TicketPresentationService extends BaseService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketRepo: Repository<Tickets>,
    private readonly eventService: EventPresentationService,
    private readonly paymentService: PaymentsPresentationService,
    private readonly userService: UserPresentationService,
  ) {
    super();
  }

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
    const callbackUrl = 'URL_ADDRESS:3000/payments/verify';

    await this.paymentService.initializePayment(
      email,
      amount,
      checkUser.id,
      callbackUrl,
    );

    return {
      message: `Payment of amount:${amount} initialized successfully`,
    };
  }
}
