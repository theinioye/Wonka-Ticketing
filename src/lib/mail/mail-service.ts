import { BaseService } from '@/common/service/base.service';
import { User } from '@/user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export type SendEmailDto = {
  toEmail: string;
  context: Record<string, string | number>;
  template: string;
  subject: string;
};
@Injectable()
export class MailService extends BaseService {
  constructor(private readonly mailerService: MailerService) {
    super();
  }
  async sendConfirmationEmail(input: { user: User; token: string }) {
    const { user, token } = input;

    return this.sendEmail({
      toEmail: user.email,
      subject: 'Activate your Email!',
      template: './email-activation',
      context: {
        name: user.firstName,
        token,
      },
    });
  }
  async sendEmail(input: SendEmailDto) {
    const { toEmail: to, context, template, subject } = input;

    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
