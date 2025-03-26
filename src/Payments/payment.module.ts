import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './controllers/payment-controller';
import { Payments } from './entities/payment.entity';
import { PaymentsPresentationService } from './presentation-services/payment-presentation-service';

@Module({
  imports: [TypeOrmModule.forFeature([Payments])],
  providers: [PaymentsPresentationService],
  controllers: [PaymentsController],
  exports: [],
})
export class PaymentsModule {}
