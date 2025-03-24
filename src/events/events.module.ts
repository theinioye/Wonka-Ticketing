import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/events.entity';
import { Category } from './entities/categories.entity';
import { Tickets } from './entities/tickets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Category, Tickets])],
  providers: [],
  exports: [],
})
export class EventsModule {}
