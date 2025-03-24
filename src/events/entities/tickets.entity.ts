import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './categories.entity';
import { Events } from './events.entity';

@Entity()
export class Tickets extends BaseModelEntity {
  @Column({ default: false })
  isCheckedIn: boolean;

  @Column({ nullable: true })
  qrcodeurl: string;

  @ManyToOne(() => Events, (event) => event.tickets)
  event: Events;

  @ManyToOne(() => Category, (category) => category.tickets, {
    cascade: true,
  })
  category: Category;
}
