import { Doacao } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { Observer } from 'src/patterns/interfaces/Observer';

export class DoadorObserver implements Observer {
  notify(eventType: string, data: Doacao): void {
    if (
      eventType === 'DOACAO_RECEBIDA' &&
      data.pes_id_doador === this.pes_id &&
      data.doa_id === this.doa_id
    ) {
      this.mailService.sendMail(
        this.pes_email,
        'Sua doação foi recebida',
        `<h3>Sua doação foi recebida, agradecemos por contribuir. Se essa doação não foi feita por você ou alguém próximo sob sua autorização, por favor entre em contato.</h3>`,
      );
    }
    if (
      eventType === 'DOACAO_CANCELADA' &&
      data.pes_id_doador === this.pes_id &&
      data.doa_id === this.doa_id
    ) {
      this.mailService.sendMail(
        this.pes_email,
        'Sua doação foi cancelada',
        `<h3>Informamos que sua doação foi cancelada, para mais informações entre em contato</h3>`,
      );
    }
  }
  constructor(
    private readonly mailService: MailService,
    public pes_id: number,
    public pes_email: string,
    public doa_id: number,
  ) {}
}
