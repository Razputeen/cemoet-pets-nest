import { Test, TestingModule } from '@nestjs/testing';
import { AlamatController } from './alamat.controller';
import { AlamatService } from './alamat.service';

describe('AlamatController', () => {
  let controller: AlamatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlamatController],
      providers: [AlamatService],
    }).compile();

    controller = module.get<AlamatController>(AlamatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
