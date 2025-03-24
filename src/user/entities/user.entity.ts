import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { compareHash } from '../../common/utils/utils';
import { OtpToken } from '../../otp-token/entities/otp-token.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseModelEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, default: null })
  phoneNumber: string;

  @Column({ nullable: true, default: null })
  lastLogInDate: Date;

  @Column({ nullable: true, default: null })
  profileImageUrl: string;

  @Column({ nullable: true, default: null })
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
