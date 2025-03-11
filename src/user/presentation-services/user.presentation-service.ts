import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/request/create-user.dto';
import { hashstring } from '@/common/utils/utils';
import { MailService } from '@/lib/mail/mail-service';
import {
  OtpTokenPresentationService,
  OtpTokenType,
} from '@/otp-token/presentation-services/otp-token.presentation-service';

@Injectable()
export class UserPresentationService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private readonly mailService: MailService,
    private readonly otpService: OtpTokenPresentationService,
  ) {}
  public db = this.repo;

  async signUp(data: CreateUserDto): Promise<User> {
    const { email, password, ...rest } = data;
    const existingUser = await this.repo.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User email already exists');
    }
    const hashedPassword = await hashstring(password);
    const user = this.repo.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    // const token =

    await this.otpService.createOtpToken(OtpTokenType.EMAIL, user);

    await this.mailService.sendTestEmail();
    // await this.mailService.sendConfirmationEmail({
    //   user: user,
    //   token,
    // });

    return this.repo.save(user);
  }
}
