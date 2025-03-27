import { User } from '@/user/entities/user.entity';
import { IsString } from 'class-validator';

export class CreateTicketInputDto {
  @IsString()
  eventId: string;
  @IsString()
  categoryId: string;
  @IsString()
  quantity: string;
}

export class CreateTicketDto {
  @IsString()
  eventId: string;
  @IsString()
  categoryId: string;
  @IsString()
  quantity: string;
  @IsString()
  user: User;
}
