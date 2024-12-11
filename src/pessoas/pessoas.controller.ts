import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  // UseGuards,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
// import { AuthTokenGuard } from 'src/auth/guards/auth-token.guards';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import * as path from 'path';
import * as fs from 'fs/promises';

// @UseGuards(AuthTokenGuard)
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
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    const recadoAux = this.pessoasService.update(
      id,
      updateRecadoDto,
      tokenPayload,
    );
    return recadoAux;
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    this.pessoasService.remove(id, tokenPayload);
    return { message: 'Excluido com sucesso!' };
  }

  @Post('upload-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPicture(
    @UploadedFile() file: Express.Multer.File,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    const fileExtension = path
      .extname(file.originalname)
      .toLowerCase()
      .substring(1);

    const fileName = `${tokenPayload.sub}.${fileExtension}`;
    const fileFullPath = path.resolve(process.cwd(), 'pictures', fileName);

    await fs.writeFile(fileFullPath, file.buffer);

    console.log(fileFullPath);
    // return true;
    return { fieldname: file.fieldname };
  }
}
