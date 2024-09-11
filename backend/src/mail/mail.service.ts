import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(destiny: string, subject: string, html: string) {
    try {
      await this.mailerService.sendMail({
        to: destiny, // sender address
        subject: subject,
        html,
      });
      return {
        success: true,
      };
    } catch (error) {
      console.error('Erro ao enviar e-mail: ', error);
      return {
        success: false,
      };
    }
  }
}
