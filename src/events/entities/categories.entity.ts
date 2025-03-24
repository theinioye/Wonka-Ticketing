import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Tickets } from './tickets.entity';
import { Events } from './events.entity';

@Entity()
export class Category extends BaseModelEntity {
  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column()
  price: string;

  @OneToMany(() => Tickets, (ticket) => ticket.category)
  tickets: Tickets[];

  @ManyToOne(() => Events, (event) => event.categories)
  event: Events;
}
