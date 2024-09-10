import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DoacoesService } from './doacoes.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';

@Controller('doacoes')
export class DoacoesController {
  constructor(private readonly doacoesService: DoacoesService) {}

  @Post()
  create(@Body() createDoacaoTDto: CreateDoacaoDto) {
    return this.doacoesService.create(createDoacaoTDto);
  }

  @Get()
  findAll() {
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
