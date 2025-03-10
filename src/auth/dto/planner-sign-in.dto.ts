import { IsEmail, MinLength } from 'class-validator';

export class PlannerSignInDto {
  @IsEmail()
  email: string;

  @MinLength(7)
  password: string;
}
