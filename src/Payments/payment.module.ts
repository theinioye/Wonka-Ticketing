import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './controllers/payment-controller';
import { Payments } from './entities/payment.entity';
import { PaymentsPresentationService } from './presentation-services/payment-presentation-service';

@Module({
  imports: [TypeOrmModule.forFeature([Payments]), UserModule],
  providers: [PaymentsPresentationService],
  controllers: [PaymentsController],
  exports: [PaymentsPresentationService],
})
export class PaymentsModule {}
