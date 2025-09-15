import { Test, TestingModule } from '@nestjs/testing';
import { HotelResService } from './hotel-res.service';

describe('HotelResService', () => {
  let service: HotelResService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelResService],
    }).compile();

    service = module.get<HotelResService>(HotelResService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
