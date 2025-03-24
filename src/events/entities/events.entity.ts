import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Tickets } from './tickets.entity';
import { Planner } from '@/planner/entities/planner.entity';
import { Category } from './categories.entity';

@Entity()
export class Events extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  location: string;

  @Column()
  EndDate: Date;

  @Column()
  isOngoing: boolean;

  @OneToMany(() => Tickets, (ticket) => ticket.event, { cascade: true })
  tickets: Tickets[];

  @JoinTable()
  @ManyToMany(() => Planner, (planner) => planner.events)
  planners: Planner[];

  @OneToMany(() => Category, (category) => category.event, { cascade: true })
  categories: Category[];
}
