import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZombieEntity } from './entities/zombie.entity';
import { Repository } from 'typeorm';
import { ZombieDto } from './dto/zombie.dto';
import { ItemService } from '../item/item.service';

@Injectable()
export class ZombieService {
  constructor(
    @InjectRepository(ZombieEntity)
    private zombieRepository: Repository<ZombieEntity>,
    private itemService: ItemService,
  ) {}

  create(data: ZombieDto) {
    return this.zombieRepository.save({
      name: data.name,
    });
  }

  findAll() {
    return this.zombieRepository.find();
  }

  findOne(id: number) {
    return this.zombieRepository.findOne(id, {
      relations: ['item'],
    });
  }

  async update(id: number, data: ZombieDto) {
    const zombie = await this.zombieRepository.findOne(id);
    if (!zombie) {
      throw new BadRequestException('Zombie not found!');
    }
    return this.zombieRepository.save({
      id: id,
      name: data.name,
    });
  }

  remove(id: number) {
    return this.zombieRepository.delete(id);
  }

  async addItemToZombie(id: number, itemId: number) {
    const zombie = await this.zombieRepository.findOne(id, {
      relations: ['item'],
    });
    if (!zombie) {
      throw new BadRequestException('Zombie not found!');
    }
    if (zombie.item.length === 5) {
      throw new BadRequestException('Zombie has already got 5 items!');
    }

    const item = await this.itemService.findOne(itemId);
    if (!item) {
      throw new BadRequestException('Item not found!');
    }
    zombie.item.push(item);
    return this.zombieRepository.save(zombie);
  }

  async deleteItemToZombie(id: number, itemId: number) {
    const zombie = await this.zombieRepository.findOne(id, {
      relations: ['item'],
    });
    if (!zombie) {
      throw new BadRequestException('Zombie not found!');
    }

    zombie.item = zombie.item.filter((item) => {
      if (item.id === itemId) {
        return false;
      }

      return true;
    });
    return this.zombieRepository.save(zombie);
  }

  getZombieItems() {
    // return this.itemService.findAll();
    return this.zombieRepository.createQueryBuilder()
      .select('name, price, SUM(priceUsd) as total_usd')
      .getMany();
  }
}
