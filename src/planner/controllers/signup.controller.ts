import { Body, Controller, Post } from '@nestjs/common';
import { PlannerPresentationService } from '../presentation-services.ts/planner.presentation-service';
import { CreatePlannerDto } from '../dtos/request/create-planner.dto';
import { Public } from '@/auth/decorators/public.decorators';

@Controller('planner')
export class PlannerSignUpController {
  constructor(private plannerService: PlannerPresentationService) {}
  @Public()
  @Post('/signup')
  async emailSignUp(@Body() body: CreatePlannerDto) {
    return this.plannerService.signUp(body);
  }
}
