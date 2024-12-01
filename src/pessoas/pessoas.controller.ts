import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private pessoasService: PessoasService) {}

  @Get()
  async findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.pessoasService.findOne(id);
  }

  @Post()
  async create(@Body() createRecadoDto: CreatePessoaDto) {
    const recadoAux = this.pessoasService.create(createRecadoDto);
    return recadoAux;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdatePessoaDto,
  ) {
    const recadoAux = this.pessoasService.update(id, updateRecadoDto);
    return recadoAux;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    this.pessoasService.remove(id);
    return { message: 'Excluido com sucesso!' };
  }
}
