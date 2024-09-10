import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';

@Controller('doacoes')
export class DoacoesController {
  constructor(private readonly doacoesTService: DoacoesService) {}

  @Post()
  create(@Body() createDoacaoTDto: CreateDoacaoDto) {
    return this.doacoesTService.create(createDoacaoTDto);
  }

  @Get()
  findAll() {
    return this.doacoesTService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doacoesTService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doacoesTService.remove(+id);
  }
}
