import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './controllers/payment-controller';
import { Payments } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payments])],
  providers: [],
  controllers: [PaymentsController],
  exports: [],
})
export class PaymentsModule {}
