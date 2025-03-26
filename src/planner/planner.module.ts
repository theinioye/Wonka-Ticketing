import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planner } from './entities/planner.entity';
import { PlannerSignUpController } from './controllers/signup.controller';
import { PlannerPresentationService } from './presentation-services.ts/planner.presentation-service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Planner]), forwardRef(() => UserModule)],
  controllers: [PlannerSignUpController],
  providers: [PlannerPresentationService],
  exports: [PlannerPresentationService],
})
export class PlannerModule {}
