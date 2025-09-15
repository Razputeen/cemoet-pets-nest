import { Test, TestingModule } from '@nestjs/testing';
import { HotelResController } from './hotel-res.controller';
import { HotelResService } from './hotel-res.service';

describe('HotelResController', () => {
  let controller: HotelResController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelResController],
      providers: [HotelResService],
    }).compile();

    controller = module.get<HotelResController>(HotelResController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
