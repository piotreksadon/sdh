import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateZombieDto {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;
}
