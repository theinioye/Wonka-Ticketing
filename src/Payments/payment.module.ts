import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payments])],
  providers: [],
  controllers: [],
  exports: [],
})
export class PaymentsModule {}
