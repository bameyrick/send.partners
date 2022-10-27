import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

import { MailService } from './mail.service';
import { I18nModule } from '../i18n/translate.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'app/mail/templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    I18nModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
