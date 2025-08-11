import { Test, TestingModule } from '@nestjs/testing';
import { ProductimageController } from './productimage.controller';
import { ProductimageService } from './productimage.service';

describe('ProductimageController', () => {
  let controller: ProductimageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductimageController],
      providers: [ProductimageService],
    }).compile();

    controller = module.get<ProductimageController>(ProductimageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
