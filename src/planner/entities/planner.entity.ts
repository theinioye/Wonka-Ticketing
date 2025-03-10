import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { compareHash } from '../../common/utils/utils';
import { OtpToken } from '../../otp-token/entities/otp-token.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Planner extends BaseModelEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  phoneNumber: string;

  @Column({ nullable: true, default: null })
  profileImageUrl: string;

  @Column({ nullable: true, default: null })
  hasActivatedEmail: boolean;

  @Column({ nullable: true, default: null })
  lastLogInDate: Date;

  @OneToMany(() => OtpToken, (token) => token.user)
  otpTokens: OtpToken[];

  //   TO-DO:Add Ticket relation
  // TO-DO:Add event relation

  async verifyPassword(password: string): Promise<boolean> {
    return compareHash(password, this.password);
  }
}
