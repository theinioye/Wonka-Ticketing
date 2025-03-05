import { Module } from '@nestjs/common';
import { OtpTokenPresentationService } from './presentation-services/otp-token.presentation-service';

@Module({
  imports: [],
  providers: [OtpTokenPresentationService],
  controllers: [],
  exports: [],
})
export class OTPModule {}
