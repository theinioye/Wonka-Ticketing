import { BaseModelEntity } from 'src/common/entities/base-model.entity';
import { compareHash } from 'src/common/utils';
import { OtpToken } from 'src/otp-token/entities/otp-token.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseModelEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  lastLogInDate: Date;

  @Column()
  hasActivatedEmail: boolean;
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => OtpToken, (token) => token.user)
  otpTokens: OtpToken[];

  async verifyPassword(password: string): Promise<boolean> {
    return compareHash(password, this.password);
  }
}
