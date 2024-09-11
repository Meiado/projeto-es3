import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST,
    secure: false,
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@localhost>',
  },
  preview: true,
  template: {
    dir: process.cwd() + '/template/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
