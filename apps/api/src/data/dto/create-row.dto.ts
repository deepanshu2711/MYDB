import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateDatumDto {
  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;
}
