import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Planner } from '../../planner/entities/planner.entity';
import { Category } from './categories.entity';
import { Tickets } from './tickets.entity';
import { BaseModelEntity } from '../../common/entities/base-model.entity';

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

  @JoinTable()
  @ManyToMany(() => Planner, (planner) => planner.events)
  planners: Planner[];

  @OneToMany(() => Category, (category) => category.event, { cascade: true })
  categories: Category[];
}
