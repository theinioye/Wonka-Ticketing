import { Module } from '@nestjs/common';
import { OtpTokenPresentationService } from './presentation-services/otp-token.presentation-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpToken } from './entities/otp-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtpToken])],
  providers: [OtpTokenPresentationService],
  controllers: [],
  exports: [OtpTokenPresentationService],
})
export class OTPModule {}
