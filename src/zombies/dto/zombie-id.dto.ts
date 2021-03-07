import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ZombieIdDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
