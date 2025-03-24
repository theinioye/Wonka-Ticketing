import { BaseService } from '@/common/service/base.service';
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

  // async sendMail() {
  //   const { toEmail: to, context, template, subject } = input;

  //   await this.sendMail({
  //     to,
  //     subject,
  //     template,
  //     context,
  //   });
  // }
}
