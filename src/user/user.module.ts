import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSignUpController } from './controllers/user.controller';
import { UserPresentationService } from './presentation-services/user.presentation-service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserSignUpController],
  providers: [UserPresentationService],
  exports: [UserPresentationService],
})
export class UserModule {}
