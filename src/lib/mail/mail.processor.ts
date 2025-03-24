// mail.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Processor('mail-queue')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  // Configure your Nodemailer transporter using environment variables.
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  @Process('send-mail')
  async handleSendMail(
    job: Job<{ to: string; subject: string; html: string }>,
  ) {
    try {
      const { to, subject, html } = job.data;
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM, // e.g. '"Your Name" <your.email@example.com>'
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${job.data.to}: ${error.message}`,
        error.stack,
      );
      // Optionally, rethrow the error to let Bull mark the job as failed.
      throw error;
    }
  }
}
