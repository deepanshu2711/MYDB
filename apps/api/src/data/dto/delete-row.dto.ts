import { IsNotEmpty, IsObject } from 'class-validator';

export class DeleteRowDto {
  @IsObject()
  @IsNotEmpty()
  filter: Record<string, any>;
}
