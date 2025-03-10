import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LogInController } from './controllers/log-in.controller';
import { AuthPresentationService } from './presentation-services/auth.presentation-service';
import { UserModule } from '@/user/user.module';
import { PlannerModule } from '@/planner/planner.module';
import { OTPModule } from '@/otp-token/otp-token.module';

@Module({
  controllers: [LogInController],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_AT },
    }),
    UserModule,
    PlannerModule,
    OTPModule,
    JwtModule,
  ],
  providers: [JwtService, AuthPresentationService],
  exports: [],
})
export class AuthModule {}
