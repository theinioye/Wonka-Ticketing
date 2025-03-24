import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSignUpController } from './controllers/user.controller';
import { UserPresentationService } from './presentation-services/user.presentation-service';
import { LibModule } from '@/lib/mail/lib.module';
import { OTPModule } from '@/otp-token/otp-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LibModule,
    forwardRef(() => OTPModule),
  ],
  controllers: [UserSignUpController],
  providers: [UserPresentationService],
  exports: [UserPresentationService],
})
export class UserModule {}
