import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  firstName: string;

  @MinLength(4)
  lastName: string;

  @MinLength(7)
  password: string;
}
