import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async findAll() {
    const pessoas = await this.pessoaRepository.find({
      order: { id: 'desc' },
    });
    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({ where: { id } });
    if (pessoa) return pessoa;
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaData = {
        name: createPessoaDto.name,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };
      const pessoa = this.pessoaRepository.create(pessoaData);
      await this.pessoaRepository.save(pessoa);
      return pessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já cadastrado !');
      }
      return error;
    }
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoaData = {
      name: updatePessoaDto.name,
      passwordHash: updatePessoaDto.password,
    };

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...pessoaData,
    });
    if (!pessoa) {
      throw new NotFoundException('Pessoa nã oencontrada!');
    }

    return this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) {
      throw new NotFoundException('Pessoa nã oencontrada!');
    }
    return this.pessoaRepository.remove(pessoa);
  }
}
