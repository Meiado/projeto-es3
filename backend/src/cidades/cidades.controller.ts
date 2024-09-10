import { Controller, Get, Param } from '@nestjs/common';
import { CidadesService } from './cidades.service';
@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Get()
  findAll() {
    return this.cidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadesService.findOne(+id);
  }

  @Get(':id')
  findByEstado(@Param('id') id: string) {
    return this.cidadesService.findByEstado(+id);
  }
}
