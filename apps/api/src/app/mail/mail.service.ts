import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmailVerification(to: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Verify email',
      template: 'email-verify',
      context: {
        code,
        hours: process.env.MAIL_VERIFICATION_EXPIRY_HOURS,
      },
    });
  }
}
