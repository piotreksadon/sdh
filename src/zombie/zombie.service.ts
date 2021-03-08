import { Injectable } from '@nestjs/common';
import { ZombieDto } from './dto/zombie.dto';

@Injectable()
export class ZombieService {
  create(ZombieDto: ZombieDto) {
    return 'This action adds a new zombie';
  }

  findAll() {
    return `This action returns all zombie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zombie`;
  }

  update(id: number, ZombieDto: ZombieDto) {
    return `This action updates a #${id} zombie`;
  }

  remove(id: number) {
    return `This action removes a #${id} zombie`;
  }
}
