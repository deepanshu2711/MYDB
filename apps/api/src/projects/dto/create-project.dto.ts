import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(18)
  @MaxLength(24)
  @Matches(/^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[_\-.!]){2})[A-Za-z0-9_\-.!]+$/, {
    message:
      'Password must be 18-24 chars, contain at least 2 uppercase, 2 lowercase, 2 digits, and 2 special chars from: _ - . !',
  })
  password: string;
}
