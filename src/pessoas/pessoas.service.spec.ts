import { Repository } from 'typeorm';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

describe('UserService', () => {
  let pessoaService: PessoasService;
  let pessoaRepository: Repository<Pessoa>;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoasService,
        {
          provide: getRepositoryToken(Pessoa),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    pessoaService = module.get<PessoasService>(PessoasService);
    pessoaRepository = module.get<Repository<Pessoa>>(
      getRepositoryToken(Pessoa),
    );
    hashingService = module.get<HashingService>(HashingService);
  });

  it('should create a new person', async () => {
    const createPessoaDto: CreatePessoaDto = {
      email: 'luiz@gmail.com',
      name: 'Luiz',
      password: '123456',
    };

    const passwordHash = 'HASHDESENHA';

    jest.spyOn(hashingService, 'hash').mockRejectedValue(passwordHash);

    await pessoaService.create(createPessoaDto);

    expect(hashingService.hash).toHaveBeenCalledWith(createPessoaDto.password);
    expect(pessoaRepository.create).toHaveBeenCalledWith({
      name: createPessoaDto.name,
      passwordHash: passwordHash,
      email: createPessoaDto.email,
    });
  });
});
