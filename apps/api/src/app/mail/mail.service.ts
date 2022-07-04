import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TranslateService } from '../i18n';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private readonly translateService: TranslateService) {}

  public async sendEmailVerification(to: string, code: string, language: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: this.translateService.translate(language, 'api.emails.verify_email.title'),
      template: 'email-verify',
      context: {
        title: this.translateService.translate(language, 'api.emails.verify_email.title'),
        code: this.translateService.translate(language, 'api.emails.verify_email.code', { code }),
        expires: this.translateService.translate(language, 'api.emails.verify_email.expires', {
          hours: process.env.MAIL_VERIFICATION_EXPIRY_HOURS,
        }),
      },
    });
  }
}
