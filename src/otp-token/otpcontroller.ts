import { Body, Controller, Post } from '@nestjs/common';
import { OtpTokenPresentationService } from './presentation-services/otp-token.presentation-service';
import { OtpTokenType } from './entities/otp-token.entity';
import { UserPresentationService } from '@/user/presentation-services/user.presentation-service';

type otptest = {
  email: string;
};
@Controller()
export class TestOTPController {
  constructor(
    private readonly otpService: OtpTokenPresentationService,
    private readonly userService: UserPresentationService,
  ) {}

  @Post('testotp')
  async test(@Body() input: otptest) {
    const email = input.email;
    const user = await this.userService.db.findOneBy({ email });
    const type = OtpTokenType.EMAIL;
    const otp = await this.otpService.createOtpToken(type, user);
    return { otp };
  }
}
