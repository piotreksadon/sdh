import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZombieEntity } from './entities/zombie.entity';
import { Repository } from 'typeorm';
import { ZombieDto } from './dto/zombie.dto';

@Injectable()
export class ZombieService {
  constructor(
    @InjectRepository(ZombieEntity)
    private zombieRepository: Repository<ZombieEntity>,
  ) {}
  create(data: ZombieDto) {
    return this.zombieRepository.save({
      name: data.name,
      created_at: data.created_at,
    });
  }

  findAll() {
    return this.zombieRepository.find();
  }

  findOne(id: number) {
    return this.zombieRepository.findOne(+id);
  }

  update(id: number, data: ZombieDto) {
    return this.zombieRepository.save({
      name: data.name,
    });
  }

  remove(id: number) {
    return this.zombieRepository.delete(id);
  }
}
