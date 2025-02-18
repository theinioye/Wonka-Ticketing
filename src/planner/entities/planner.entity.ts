import { BaseModelEntity } from 'src/common/entities/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Planner extends BaseModelEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  //   TO-DO:Add Ticket relation
  // TO-DO:Add event relation
}
