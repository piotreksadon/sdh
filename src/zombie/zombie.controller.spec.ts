import { Test, TestingModule } from '@nestjs/testing';
import { ZombieController } from './zombie.controller';
import { ZombieService } from './zombie.service';

describe('ZombieController', () => {
  let controller: ZombieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZombieController],
      providers: [ZombieService],
    }).compile();

    controller = module.get<ZombieController>(ZombieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
