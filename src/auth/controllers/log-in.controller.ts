import { Body, Controller, Post } from '@nestjs/common';
import { AuthPresentationService } from '../presentation-services/auth.presentation-service';
import { UserSignInDto } from '../dto/user-sign-in.dto';
import { PlannerSignInDto } from '../dto/planner-sign-in.dto';

@Controller('login')
export class LogInController {
  constructor(private authService: AuthPresentationService) {}

  @Post('/user')
  async userLogIn(@Body() data: UserSignInDto) {
    return this.authService.userLogIn(data);
  }

  @Post('/planner')
  async plannerLogIn(@Body() data: PlannerSignInDto) {
    return this.authService.plannerLogIn(data);
  }
}
