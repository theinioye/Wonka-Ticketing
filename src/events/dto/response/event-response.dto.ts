import { IsOptional, IsString } from 'class-validator';

export class EventResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  startDate: Date;

  @IsOptional()
  @IsString()
  googleMapUrl: string;
}
