import { IsObject, IsNotEmpty } from 'class-validator';

export class UpdateRowDto {
  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;

  @IsObject()
  @IsNotEmpty()
  filter: Record<string, any>;
}
