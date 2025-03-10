import { Body, Controller, Post } from '@nestjs/common';
import { PlannerPresentationService } from '../presentation-services.ts/planner.presentation-service';
import { CreatePlannerDto } from '../dtos/request/create-planner.dto';

@Controller('planner')
export class PlannerSignUpController {
  constructor(private plannerService: PlannerPresentationService) {}

  @Post('/signup')
  async emailSignUp(@Body() body: CreatePlannerDto) {
    return this.plannerService.signUp(body);
  }
}
