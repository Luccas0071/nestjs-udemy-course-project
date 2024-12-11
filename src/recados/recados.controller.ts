import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
// import { RoutePolicyGuard } from 'src/auth/guards/route-policy.guards';
// import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
// import { RoutePolicies } from 'src/auth/enum/route-policies.enum';

// DTO - Data Transfer Object -> Objeto de transformar dados
// DTO - Objto simples -> validar dados / transformar dados
// @UseGuards(RoutePolicyGuard)
@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Get()
  // @SetRoutePolicy(RoutePolicies.findAllRecados)
  findAll(@Query() paginationDto: PaginationDto) {
    //Query dados passados pela url exe: ?teste=10&?teste01=teste
    return this.recadosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(
    @Body() createRecadoDto: CreateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    const recadoAux = this.recadosService.create(createRecadoDto, tokenPayload);
    return recadoAux;
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    const recadoAux = this.recadosService.update(
      id,
      updateRecadoDto,
      tokenPayload,
    );
    return recadoAux;
  }

  @Delete(':id')
  remove(
    @Param('id') id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    this.recadosService.remove(id, tokenPayload);
    return { message: 'Excluido com sucesso!' };
  }
}
