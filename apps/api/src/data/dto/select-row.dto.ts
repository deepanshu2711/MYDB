import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SelectRowDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1000)
  limit?: number = 25;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @IsOptional()
  @IsString()
  order?: string;

  @IsOptional()
  @IsString()
  select?: string;

  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;
}
