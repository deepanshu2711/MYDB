import { IsNotEmpty, IsString } from 'class-validator';

export class ExecuteQueryDto {
  @IsString()
  @IsNotEmpty()
  sql: string;
}
