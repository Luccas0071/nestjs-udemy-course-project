import {
  IsEmail,
  IsNotEmpty,
  IsString,
  // IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

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
}
