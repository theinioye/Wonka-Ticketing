import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/events.entity';
import { Category } from './entities/categories.entity';
import { Tickets } from './entities/tickets.entity';
import { EventPresentationService } from './presentation-services/event-presentation-service';
import { PlannerModule } from '@/planner/planner.module';
import { EventsController } from './controllers/event-controller';
import { TicketPresentationService } from './presentation-services/ticket-presentation service';
import { TicketsController } from './controllers/tickets-controller';

@Module({
  controllers: [EventsController, TicketsController],
  imports: [
    TypeOrmModule.forFeature([Events, Category, Tickets]),
    PlannerModule,
  ],
  providers: [EventPresentationService, TicketPresentationService],
  exports: [],
})
export class EventsModule {}
