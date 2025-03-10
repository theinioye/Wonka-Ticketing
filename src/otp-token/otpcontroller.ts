import { Body, Controller, Post } from '@nestjs/common';
import { OtpTokenPresentationService } from './presentation-services/otp-token.presentation-service';
import { OtpTokenType } from './entities/otp-token.entity';
import { UserPresentationService } from '@/user/presentation-services/user.presentation-service';
import { PlannerPresentationService } from '@/planner/presentation-services.ts/planner.presentation-service';
import { BaseService } from '@/common/service/base.service';

type otptest = {
  email: string;
};
@Controller()
export class TestOTPController extends BaseService {
  constructor(
    private readonly otpService: OtpTokenPresentationService,
    private readonly userService: UserPresentationService,
    private readonly plannerService: PlannerPresentationService,
  ) {
    super();
  }

  @Post('testotp')
  async test(@Body() input: otptest) {
    const email = input.email;
    const user = await this.userService.db.findOneBy({ email });
    this.logger.log('>>>>>>>>>>>>>>>>>>', { user });
    const type = OtpTokenType.EMAIL;
    const otp = await this.otpService.createOtpToken(type, user);
    return { otp };
  }
}
