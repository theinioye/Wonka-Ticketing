// import { BaseService } from '@/common/service/base.service';
// import { User } from '@/user/entities/user.entity';
// import { MailerService } from '@nestjs-modules/mailer';
// import { Injectable } from '@nestjs/common';

// export type SendEmailDto = {
//   toEmail: string;
//   context: Record<string, string | number>;
//   template: string;
//   subject: string;
// };
// @Injectable()
// export class MailService extends BaseService {
//   constructor(private readonly mailerService: MailerService) {
//     super();
//   }
//   async sendConfirmationEmail(input: { user: User; token: string }) {
//     const { user, token } = input;

//     return this.sendEmail({
//       toEmail: user.email,
//       subject: 'Activate your Email!',
//       template: './email-activation',
//       context: {
//         name: user.firstName,
//         token,
//       },
//     });
//   }
//   async sendEmail(input: SendEmailDto) {
//     const { toEmail: to, context, template, subject } = input;

//     await this.mailerService.sendMail({
//       to,
//       subject,
//       template,
//       context,
//     });
//   }
// }
// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api',
        pass: '7f8cc7696dbbcdaef8393fd170e9ee0d',
      },
    });
  }

  async sendTestEmail(): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        to: 'theinioye@gmail.com',
        subject: 'Test Email via Mailtrap',
        text: 'Hello, this is a test email sent using Nodemailer with Mailtrap!',
        html: '<b>Hello, this is a test email sent using Nodemailer with Mailtrap!</b>',
      });
      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
