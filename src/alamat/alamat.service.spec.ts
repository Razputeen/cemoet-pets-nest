import { Test, TestingModule } from '@nestjs/testing';
import { AlamatService } from './alamat.service';

describe('AlamatService', () => {
  let service: AlamatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlamatService],
    }).compile();

    service = module.get<AlamatService>(AlamatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
