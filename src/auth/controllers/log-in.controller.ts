import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthPresentationService } from '../presentation-services/auth.presentation-service';
import { UserSignInDto } from '../dto/user-sign-in.dto';
import { PlannerSignInDto } from '../dto/planner-sign-in.dto';
import { Public } from '../decorators/public.decorators';

@Controller('login')
export class LogInController {
  constructor(private authService: AuthPresentationService) {}

  @Post('/user')
  async userLogIn(@Body() data: UserSignInDto) {
    return this.authService.userLogIn(data);
  }

  @Public()
  @Post('/planner')
  async plannerLogIn(@Body() data: PlannerSignInDto) {
    return this.authService.plannerLogIn(data);
  }

  @Get()
  async getHello() {
    return 'Hello World!';
  }
}
