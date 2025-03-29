import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Tickets } from './tickets.entity';
import { Events } from './events.entity';
import { Payments } from '../../payments/entities/payment.entity';

@Entity()
export class Category extends BaseModelEntity {
  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column()
  price: string;

  @OneToMany(() => Payments, (payment) => payment.category)
  payments: Payments[];

  @OneToMany(() => Tickets, (ticket) => ticket.category)
  tickets: Tickets[];

  @ManyToOne(() => Events, (event) => event.categories)
  event: Events;
}
