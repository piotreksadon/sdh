import { IsString, MaxLength, MinLength } from 'class-validator';

export class ZombieDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;
  created_at: string;
}
