import { Test, TestingModule } from '@nestjs/testing';
import { ProductimageService } from './productimage.service';

describe('ProductimageService', () => {
  let service: ProductimageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductimageService],
    }).compile();

    service = module.get<ProductimageService>(ProductimageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
