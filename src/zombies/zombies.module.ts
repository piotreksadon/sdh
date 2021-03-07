import { Module } from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { ZombiesController } from './zombies.controller';

@Module({
  controllers: [ZombiesController],
  providers: [ZombiesService]
})
export class ZombiesModule {}
