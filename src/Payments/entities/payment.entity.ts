import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Payments extends BaseModelEntity {
  @Column()
  reference: string; // Paystack transaction reference

  @Column()
  amount: number; // Stored in Naira, not kobo

  @Column({ default: 'pending' })
  status: string; // pending, success, failed

  @Column()
  email: string; // Customer email

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
