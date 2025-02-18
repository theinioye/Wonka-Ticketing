import { IsEmail, MinLength } from 'class-validator';

export class CreatePlannerDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  name: string;

  @MinLength(7)
  password: string;
}
