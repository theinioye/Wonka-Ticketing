import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planner } from './entities/planner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planner])],
  controllers: [],
  providers: [],
  exports: [],
})
export class PlannerModule {}
