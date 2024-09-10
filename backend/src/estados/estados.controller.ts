import { Controller, Get, Param } from '@nestjs/common';
import { EstadosService } from './estados.service';
@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Get()
  findAll() {
    return this.estadosService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(+id);
  }
  @Get(':sigla')
  findBySigla(@Param('sigla') sigla: string) {
    return this.estadosService.findBySigla(sigla);
  }
}
