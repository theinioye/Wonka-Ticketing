import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Events } from './events.entity';

@Entity()
export class Tickets extends BaseEntity {
  @Column({ default: false })
  isCheckedIn: boolean;

  @Column({ nullable: true })
  qrcodeurl: string;

  @ManyToOne(() => Events, (event) => event.tickets, { cascade: true })
  event: Events;
}
