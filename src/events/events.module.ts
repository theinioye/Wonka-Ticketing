import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/events.entity';
import { Category } from './entities/categories.entity';
import { Tickets } from './entities/tickets.entity';
import { EventPresentationService } from './presentation-services/event-presentation-service';
import { PlannerModule } from '@/planner/planner.module';
import { EventsController } from './controllers/event-controller';

@Module({
  controllers: [EventsController],
  imports: [
    TypeOrmModule.forFeature([Events, Category, Tickets]),
    PlannerModule,
  ],
  providers: [EventPresentationService],
  exports: [],
})
export class EventsModule {}
