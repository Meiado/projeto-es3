import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { EmailService } from 'src/email/email.service';

@Controller('doacoes')
export class DoacoesController {
  constructor(
    private readonly doacoesService: DoacoesService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  create(@Body() createDoacaoTDto: CreateDoacaoDto) {
    return this.doacoesService.create(createDoacaoTDto);
  }

  @Get()
  findAll() {
    console.log(this.emailService.getObservers());
    return this.doacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doacoesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doacoesService.remove(+id);
  }
}
