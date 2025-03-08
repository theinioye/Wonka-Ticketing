import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

export type SendEmailDto = {
  toEmail: string;
  context: Record<string, string | number>;
  template: string;
  subject: string;
};
@Injectable()
export class MailService {
  constructor(@InjectQueue('mail-queue') private readonly mailqueue: Queue) {}

  //   async sendMail() {
  //     const { toEmail: to, context, template, subject } = input;

  //     await this.sendMail({
  //       to,
  //       subject,
  //       template,
  //       context,
  //     });
  //   }
}
