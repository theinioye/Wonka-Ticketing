import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(5)
  firstName: string;

  @MinLength(5)
  lastName: string;

  @MinLength(7)
  password: string;
}
