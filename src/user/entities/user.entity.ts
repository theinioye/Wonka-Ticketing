import { BaseModelEntity } from 'src/common/entities/base-model.entity';
import { OtpToken } from 'src/otp-token/entities/otp-token.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseModelEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  hasActivatedEmail: boolean;
  @Column()
  email: string;

  @Column()
  password: string;
  @OneToMany(() => OtpToken, (token) => token.user)
  otpTokens: OtpToken[];
}
