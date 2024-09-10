import { Observer } from 'src/utils/interfaces/Observer';

export class DoadorObserver implements Observer {
  notify(eventType: string, data: any): void {
    if (eventType === 'DOACAO_RECEBIDA' && data.pes_id_doador === this.pes_id) {
      console.log(
        'Confirmação de recebimento de doação do doador ' +
          this.pes_email +
          ' (' +
          this.pes_id +
          ')',
      );
    }
    if (
      eventType === 'DOACAO_CANCELADA' &&
      data.pes_id_doador === this.pes_id
    ) {
      console.log(
        'Sua doação foi cancelada, favor entrar em contato para conferir. Email doador: ' +
          this.pes_email +
          ', ID: ' +
          this.pes_id,
      );
    }
  }

  constructor(
    public pes_id: number,
    public pes_email: string,
  ) {}
}
