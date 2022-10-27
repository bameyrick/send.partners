import { AppPath, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { mockDatabaseService } from '@mocks';
import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db';
import { TranslateService } from '../i18n';
import { I18nModule } from '../i18n/translate.module';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;
  let mailerService: MailerService;
  let translateService: TranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [I18nModule],
      providers: [
        MailService,
        TranslateService,
        {
          provide: MailerService,
          useValue: createMock<MailerService>(),
        },
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
    translateService = module.get<TranslateService>(TranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmailVerification', () => {
    it('should send an email', async () => {
      const to = 'to';
      const code = 'code';
      const language = 'en';

      await service.sendEmailVerification(to, code, language);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to,
        template: 'email-verify',
        subject: translateService.translate(language, 'api.emails.verify_email.subject', {
          site_name: translateService.translate(language, 'common.send_partners'),
        }),
        context: {
          code: translateService.translate(language, 'api.emails.verify_email.code', { code }),
          expires: translateService.translate(language, 'api.emails.verify_email.expires', {
            hours: process.env.MAIL_VERIFICATION_EXPIRY_HOURS,
          }),
        },
      });
    });
  });

  describe('sendPasswordReset', () => {
    it('should send an email', async () => {
      const user = createMock<User>({ email: 'email', language: 'en' });
      const code = 'code';

      await service.sendPasswordReset(user, code);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: user.email,
        template: 'reset-password',
        subject: translateService.translate(user.language, 'api.emails.reset_password.subject', {
          site_name: translateService.translate(user.language, 'common.send_partners'),
        }),
        context: {
          linkText: translateService.translate(user.language, 'api.emails.reset_password.link_text'),
          link: `${process.env.FRONTEND_URL}/${AppPath.ResetPasswordCode}`.replace(/:code/, code),
          expires: translateService.translate(user.language, 'api.emails.reset_password.expires', {
            hours: process.env.PASSWORD_RESET_EXPIRY_HOURS,
          }),
        },
      });
    });
  });
});
