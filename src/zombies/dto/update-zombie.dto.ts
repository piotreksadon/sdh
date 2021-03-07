import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateZombieDto } from './create-zombie.dto';

export class UpdateZombieDto extends PartialType(CreateZombieDto) {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;
}
