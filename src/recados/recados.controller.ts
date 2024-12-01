import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

// DTO - Data Transfer Object -> Objeto de transformar dados
// DTO - Objto simples -> validar dados / transformar dados

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Get()
  @UseInterceptors(AddHeaderInterceptor)
  findAll(@Query() paginationDto: PaginationDto) {
    //Query daddos passados pela url exe: ?teste=10&?teste01=teste
    return this.recadosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    const recadoAux = this.recadosService.create(createRecadoDto);

    return recadoAux;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    const recadoAux = this.recadosService.update(id, updateRecadoDto);
    return recadoAux;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.recadosService.remove(id);
    return { message: 'Excluido com sucesso!' };
  }
}
