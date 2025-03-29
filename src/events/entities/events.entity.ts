import { Payments } from '../../payments/entities/payment.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { Planner } from '../../planner/entities/planner.entity';
import { Category } from './categories.entity';
import { Tickets } from './tickets.entity';

@Entity()
export class Events extends BaseModelEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: null, type: 'timestamp' })
  startDate: Date;

  @Column({ nullable: true, default: null })
  googleMapUrl: string;

  @Column({ nullable: true, default: null, type: 'timestamp' })
  EndDate: Date;

  @Column({ default: false })
  isOngoing: boolean;

  @Column({ nullable: true, default: null })
  maximumCapacity: string;

  @OneToMany(() => Tickets, (ticket) => ticket.event, { cascade: true })
  tickets: Tickets[];

  @OneToMany(() => Payments, (payment) => payment.event, { cascade: true })
  payments: Payments[];

  @JoinTable()
  @ManyToMany(() => Planner, (planner) => planner.events)
  planners: Planner[];

  @OneToMany(() => Category, (category) => category.event, { cascade: true })
  categories: Category[];
}
