import { BaseModelEntity } from 'src/common/entities/base-model.entity';
import { OtpToken } from 'src/otp-token/entities/otp-token.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Planner extends BaseModelEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  hasActivatedEmail: boolean;

  @OneToMany(() => OtpToken, (token) => token.user)
  otpTokens: OtpToken[];

  //   TO-DO:Add Ticket relation
  // TO-DO:Add event relation
}
