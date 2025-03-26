import { IsNotEmpty, IsString } from 'class-validator';

export class SearchEventDto {
  @IsNotEmpty()
  @IsString()
  searchTerm: string;
}
