import {
  IsEmail,
  // IsEnum,
  IsNotEmpty,
  IsString,
  // IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { RoutePolicies } from 'src/auth/enum/route-policies.enum';

export class CreatePessoaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  //@IsStrongPassword({
  //  minLength: 6,
  //})
  password: string;

  // @IsEnum(RoutePolicies, { each: true })
  // routePolicies: RoutePolicies[];
}
