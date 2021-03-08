import { Module } from '@nestjs/common';
import { ZombieService } from './zombie.service';
import { ZombieController } from './zombie.controller';

@Module({
  controllers: [ZombieController],
  providers: [ZombieService]
})
export class ZombieModule {}
