import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Observer } from 'src/utils/interfaces/Observer';
import { Subject } from 'src/utils/interfaces/Subject';

@Injectable()
export class EmailService implements Subject {
  private observers: string[] = [];
  constructor(private readonly prisma: PrismaService) {
    this.addObservers();
  }
  async addObservers() {
    const pessoas = await this.prisma.pessoa.findMany();
    pessoas.forEach((pessoa) => {
      this.observers.push(pessoa.pes_email);
    });
  }

  getObservers(): string[] {
    return this.observers;
  }
  registerObserver(o: Observer): void {
    throw new Error('Method not implemented.');
  }
  removeObserver(o: Observer): void {
    throw new Error('Method not implemented.');
  }
  notifyObservers(eventType: string, data: any): void {
    throw new Error('Method not implemented.');
  }
}
