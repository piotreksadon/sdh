import {
  BadRequestException,
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
  constructor(private readonly zombieService: ZombieService) {
  }

  @Post()
  create(@Body() ZombieDto: ZombieDto) {
    return this.zombieService.create(ZombieDto);
  }

  @Get()
  findAll() {
    return this.zombieService.findAll();
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() data: ZombieDto) {
    return this.zombieService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zombieService.remove(+id);
  }

  @Post('/:id/items/:itemId')
  addItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.zombieService.addItemToZombie(+id, +itemId);
  }

  @Delete('/:id/items/:itemId')
  deleteItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.zombieService.deleteItemToZombie(+id, +itemId);
  }

  @Get('/items')
  public async getItems() {
    return this.zombieService.getZombieItems();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<ZombieDto> {
    const zombie = await this.zombieService.findOne(+id);
    if (!zombie) {
      throw new BadRequestException('Zombie not found');
    }
    return zombie;
  }
}
