import { IsEmail } from 'class-validator';
// import { RoutePolicies } from 'src/auth/enum/route-policies.enum';
import { Recado } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Uma pessoa pode ter enviado muito recados (como "de")
  //Esses recados são relacionados ao campo "de" na entidade recados
  @OneToMany(() => Recado, (recado) => recado.de)
  recadosEnviados: Recado[];

  // Uma pessoa pode ter enviado muito recados (como "para")
  //Esses recados são relacionados ao campo "para" na entidade recados
  @OneToMany(() => Recado, (recado) => recado.para)
  recadosRecebidos: Recado[];

  @Column({ default: true })
  active: boolean;

  // @Column({ type: 'simple-array', default: [] })
  // routePolicies: RoutePolicies[];
}
