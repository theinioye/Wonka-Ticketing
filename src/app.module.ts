import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { pgconfig } from './dbConfig';
import { PlannerModule } from './planner/planner.module';
import { UserModule } from './user/user.module';
import { OTPModule } from './otp-token/otp-token.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(pgconfig),
    OTPModule,
    UserModule,
    PlannerModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
