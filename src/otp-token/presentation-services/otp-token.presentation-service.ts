import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpToken } from '../entities/otp-token.entity';
import { Planner } from '@/planner/entities/planner.entity';
import { User } from '@/user/entities/user.entity';
// import { User } from 'src/user/entities/user.entity';
// import { Planner } from 'src/planner/entities/planner.entity';

export enum OtpTokenType {
  EMAIL = 'email',
  PASSWORD_RESET = 'password-reset',
}

@Injectable()
export class OtpTokenPresentationService {
  constructor(
    @InjectRepository(OtpToken)
    private repo: Repository<OtpToken>,
    private readonly logger = new Logger(OtpTokenPresentationService.name),
  ) {}

  generateOTP(): string {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }

  async createOtpToken(type: OtpTokenType, user: User | Planner) {
    const now = Date.now();
    const validityPeriod = 3600 * 1000;
    const expiresAt = new Date(now + validityPeriod);
    const token = this.generateOTP();

    return this.repo.save({
      type,
      token,
      expiresAt,
      user,
    });
  }

  async expireToken(token: OtpToken): Promise<void> {
    await this.repo.update(token.id, { hasExpired: true });
    this.logger.log('Token has been set to expired');
  }
}
