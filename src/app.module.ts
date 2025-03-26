import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/access-token.guards';
import { CommonModule } from './common/common.module';
import { pgconfig } from './dbConfig';
import { EventsModule } from './events/events.module';
import { OTPModule } from './otp-token/otp-token.module';
import { PaymentsModule } from './payments/payment.module';
import { PlannerModule } from './planner/planner.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(pgconfig),
    OTPModule,
    AuthModule,
    UserModule,
    PlannerModule,
    CommonModule,
    EventsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
