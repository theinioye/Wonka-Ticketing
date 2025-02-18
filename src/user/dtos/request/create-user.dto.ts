import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  firstname: string;

  @MinLength(6)
  lastname: string;

  @MinLength(7)
  password: string;
}
