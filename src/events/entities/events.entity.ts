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

  @Column({ nullable: true, default: null })
  startDate: Date;

  @Column({ nullable: true, default: null })
  googleMapUrl: string;

  @Column({ nullable: true, default: null })
  EndDate: Date;

  @Column({ default: false })
  isOngoing: boolean;

  @Column({ nullable: true, default: null })
  maximumCapacity: number;

  @OneToMany(() => Tickets, (ticket) => ticket.event, { cascade: true })
  tickets: Tickets[];

  @JoinTable()
  @ManyToMany(() => Planner, (planner) => planner.events)
  planners: Planner[];

  @OneToMany(() => Category, (category) => category.event, { cascade: true })
  categories: Category[];
}
