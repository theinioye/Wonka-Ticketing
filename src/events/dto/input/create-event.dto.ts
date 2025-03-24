import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto[];

  @IsString()
  googleMapUrl: string;

  @IsString()
  maximumCapacity: string;
}

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  price: string;
}
