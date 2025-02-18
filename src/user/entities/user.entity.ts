import { BaseModelEntity } from 'src/common/entities/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseModelEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
