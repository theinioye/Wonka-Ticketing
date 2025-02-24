import { BaseModelEntity } from 'src/common/entities/base-model.entity';
import { Planner } from 'src/planner/entities/planner.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum OtpTokenType {
  EMAIL = 'email',
  PASSWORD_RESET = 'password-reset',
}

@Entity()
export class OtpToken extends BaseModelEntity {
  @Column()
  token: string;
  @Column()
  expiresAt: Date;
  @Column()
  isDeactivated: boolean;
  @Column({ type: 'enum', enum: OtpTokenType })
  type: OtpTokenType;

  @ManyToOne(() => User, (user) => user.otpTokens, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Planner, (planner) => planner.otpTokens, {
    onDelete: 'CASCADE',
  })
  member: Planner;

  public hasExpired(): boolean {
    return (
      this.isDeactivated || new Date().getTime() > this.expiresAt.getTime()
    );
  }
}
