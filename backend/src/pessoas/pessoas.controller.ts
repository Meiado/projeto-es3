import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreateFisicaDto } from './dto/create-fisica.dto';
import { UpdateFisicaDto } from './dto/update-fisica.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post('fisicas')
  create(@Body() createFisicaDto: CreateFisicaDto) {
    return this.pessoasService.create(createFisicaDto);
  }

  @Get('fisicas')
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get('fisicas/:id')
  findOne(@Param('id') id: string) {
    return this.pessoasService.findOne(+id);
  }

  @Patch('fisicas/:id')
  update(@Param('id') id: string, @Body() updateFisicaDto: UpdateFisicaDto) {
    return this.pessoasService.update(+id, updateFisicaDto);
  }

  @Delete('fisicas/:id')
  remove(@Param('id') id: string) {
    return this.pessoasService.remove(+id);
  }
}
