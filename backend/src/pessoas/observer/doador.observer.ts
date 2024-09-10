import { MailerService } from '@nestjs-modules/mailer';
import { Observer } from 'src/utils/interfaces/Observer';

export class DoadorObserver implements Observer {
  notify(eventType: string, data: any): void {
    if (eventType === 'DOACAO_RECEBIDA' && data.pes_id_doador === this.pes_id) {
      this.mailerService.sendMail({
        to: this.pes_email,
        subject: 'Sua doação foi recebida',
        html: `<h3>Sua doação foi recebida, agradecemos por contribuir. Se por algum acaso não foi feita por você, por favor entre em contato.</h3>`,
      });
    }
    if (
      eventType === 'DOACAO_CANCELADA' &&
      data.pes_id_doador === this.pes_id
    ) {
      this.mailerService.sendMail({
        to: this.pes_email,
        subject: 'Sua doação foi cancelada',
        html: `<h3>Sua doação foi cancelada, entre em contato para mais informações</h3>`,
      });
    }
  }
  constructor(
    private mailerService: MailerService,
    public pes_id: number,
    public pes_email: string,
  ) {}
}
