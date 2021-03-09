import { Module } from '@nestjs/common';
import { ZombieService } from './zombie.service';
import { ZombieController } from './zombie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZombieEntity } from './entities/zombie.entity';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [TypeOrmModule.forFeature([ZombieEntity]), ItemModule],
  controllers: [ZombieController],
  providers: [ZombieService],
})
export class ZombieModule {}
