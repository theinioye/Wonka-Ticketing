import { BaseModelEntity } from '../../common/entities/base-model.entity';
import { Planner } from '../../planner/entities/planner.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum OtpTokenType {
  EMAIL = 'email',
  PASSWORD_RESET = 'password-reset',
}

@Entity('otp_tokens')
export class OtpToken extends BaseModelEntity {
  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  isDeactivated: boolean;

  @Column({ type: 'enum', enum: OtpTokenType })
  type: OtpTokenType;

  @ManyToOne(() => User, (user) => user.otpTokens, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User;

  @ManyToOne(() => Planner, (planner) => planner.otpTokens, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  planner: Planner;

  public hasExpired(): boolean {
    return (
      this.isDeactivated || new Date().getTime() > this.expiresAt.getTime()
    );
  }
}
