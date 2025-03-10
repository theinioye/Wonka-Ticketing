import { Module } from '@nestjs/common';
import { OtpTokenPresentationService } from './presentation-services/otp-token.presentation-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpToken } from './entities/otp-token.entity';
import { TestOTPController } from './otpcontroller';
import { UserModule } from '@/user/user.module';
import { PlannerModule } from '@/planner/planner.module';

@Module({
  imports: [TypeOrmModule.forFeature([OtpToken]), UserModule, PlannerModule],
  providers: [OtpTokenPresentationService],
  controllers: [TestOTPController],
  exports: [OtpTokenPresentationService],
})
export class OTPModule {}
