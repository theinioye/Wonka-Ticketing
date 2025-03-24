import { BaseModelEntity } from '@/common/entities/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Categories extends BaseModelEntity {
  @Column()
  name: string;
  @Column({ nullable: true, default: null })
  description: string;

  @Column()
  price: string;
}
