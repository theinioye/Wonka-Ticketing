import { Body, Controller, Post } from '@nestjs/common';
import { UserPresentationService } from '../presentation-services/user.presentation-service';
import { CreateUserDto } from '../dtos/request/create-user.dto';
import { Public } from '@/auth/decorators/public.decorators';

@Controller('user')
export class UserSignUpController {
  constructor(private userService: UserPresentationService) {}

  @Public()
  @Post('/signup')
  async emailSignUp(@Body() body: CreateUserDto) {
    return this.userService.signUp(body);
  }
}
