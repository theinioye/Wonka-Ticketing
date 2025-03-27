import { Events } from '../../events/entities/events.entity';
import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Category } from '../../events/entities/categories.entity';

@Entity()
export class Payments extends BaseModelEntity {
  @Column()
  reference: string; // Paystack transaction reference

  @Column()
  amount: number; // Stored in Naira, not kobo

  @Column()
  quantity: string;

  @Column({ default: 'pending' })
  status: string; // pending, success, failed

  @Column()
  email: string; // Customer email

  @ManyToOne(() => Events, (event) => event.payments)
  event: Events;

  @ManyToOne(() => Category, (category) => category.payments)
  category: Category;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
