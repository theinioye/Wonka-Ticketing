import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planner } from './entities/planner.entity';
import { PlannerSignUpController } from './controllers/signup.controller';
import { PlannerPresentationService } from './presentation-services.ts/planner.presentation-service';

@Module({
  imports: [TypeOrmModule.forFeature([Planner])],
  controllers: [PlannerSignUpController],
  providers: [PlannerPresentationService],
  exports: [],
})
export class PlannerModule {}
