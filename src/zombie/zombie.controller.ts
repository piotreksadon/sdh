import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ZombieService } from './zombie.service';
import { ZombieDto } from './dto/zombie.dto';

@Controller('zombie')
export class ZombieController {
  constructor(private readonly zombieService: ZombieService) {}

  @Post()
  create(@Body() ZombieDto: ZombieDto) {
    return this.zombieService.create(ZombieDto);
  }

  @Get()
  findAll() {
    return this.zombieService.findAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: number): Promise<ZombieDto> {
    const zombie = await this.zombieService.findOne(id);
    if (!zombie) {
      throw new Error('Zombie not found');
    }
    return this.zombieService.findOne(+ZombieDto.name);
  }

  @Put(':id')
  update(@Param() params: ZombieDto, @Body() data: ZombieDto) {
    return this.zombieService.update(+params, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zombieService.remove(+id);
  }
}
