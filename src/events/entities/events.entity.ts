import { BaseEntity, Column, Entity } from 'typeorm';

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
}
