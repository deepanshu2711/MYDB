import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class OrderDto {
  @IsString()
  column: string;

  @IsEnum(['asc', 'desc'])
  direction: 'asc' | 'desc';
}

export class QueryRequestDto {
  @IsEnum(['select', 'insert', 'update', 'delete'])
  action: 'select' | 'insert' | 'update' | 'delete';

  @IsString()
  table: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  select?: string[];

  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @IsOptional()
  @IsObject()
  filter?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  order?: OrderDto[];

  @IsOptional()
  @IsInt()
  @Min(0)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}
