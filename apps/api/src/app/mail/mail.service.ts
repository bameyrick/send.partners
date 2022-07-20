import { AppPath } from '@common';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TranslateService } from '../i18n';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private readonly translateService: TranslateService) {}

  public async sendEmailVerification(to: string, code: string, language: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: this.translateService.translate(language, 'api.emails.verify_email.subject', {
        site_name: this.translateService.translate(language, 'common.send_partners'),
      }),
      template: 'email-verify',
      context: {
        code: this.translateService.translate(language, 'api.emails.verify_email.code', { code }),
        expires: this.translateService.translate(language, 'api.emails.verify_email.expires', {
          hours: process.env.MAIL_VERIFICATION_EXPIRY_HOURS,
        }),
      },
    });
  }

  public async sendPasswordReset(to: string, code: string, language: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: this.translateService.translate(language, 'api.emails.reset_password.subject', {
        site_name: this.translateService.translate(language, 'common.send_partners'),
      }),
      template: 'reset-password',
      context: {
        linkText: this.translateService.translate(language, 'api.emails.reset_password.link_text'),
        link: `${process.env.FRONTEND_URL}/${AppPath.ResetPasswordCode}`.replace(/:code/, code),
        expires: this.translateService.translate(language, 'api.emails.reset_password.expires', {
          hours: process.env.PASSWORD_RESET_EXPIRY_HOURS,
        }),
      },
    });
  }
}
