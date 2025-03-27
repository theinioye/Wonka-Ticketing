import { PaymentsModule } from '@/payments/payment.module';
import { PlannerModule } from '@/planner/planner.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controllers/event-controller';
import { TicketsController } from './controllers/tickets-controller';
import { Category } from './entities/categories.entity';
import { Events } from './entities/events.entity';
import { Tickets } from './entities/tickets.entity';
import { EventPresentationService } from './presentation-services/event-presentation-service';
import { TicketPresentationService } from './presentation-services/ticket-presentation service';

@Module({
  controllers: [EventsController, TicketsController],
  imports: [
    TypeOrmModule.forFeature([Events, Category, Tickets]),
    PlannerModule,
    PaymentsModule,
    UserModule,
  ],
  providers: [EventPresentationService, TicketPresentationService],
  exports: [],
})
export class EventsModule {}
