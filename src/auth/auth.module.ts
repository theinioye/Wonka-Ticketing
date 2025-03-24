import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LogInController } from './controllers/log-in.controller';
import { AuthPresentationService } from './presentation-services/auth.presentation-service';
import { UserModule } from '@/user/user.module';
import { PlannerModule } from '@/planner/planner.module';
import { OTPModule } from '@/otp-token/otp-token.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy.strategy';

@Module({
  controllers: [LogInController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cService: ConfigService) => {
        return {
          global: true,
          secret: cService.get<string>('ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: cService.get<string>('ACCESS_TOKEN_EXPIRES_AT'),
          },
        };
      },
    }),
    UserModule,
    PlannerModule,
    OTPModule,
    JwtModule,
  ],
  providers: [JwtService, AuthPresentationService, JwtStrategy],
  exports: [JwtService],
})
export class AuthModule {}
