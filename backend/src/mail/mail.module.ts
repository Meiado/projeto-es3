import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './config/mailer.config';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports: [MailerModule.forRoot(mailerConfig)],
  exports: [MailerModule],
})
export class MailModule {}
