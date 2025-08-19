import { Test, TestingModule } from '@nestjs/testing';
import { GroomingReservationController } from './grooming-reservation.controller';
import { GroomingReservationService } from './grooming-reservation.service';

describe('GroomingReservationController', () => {
  let controller: GroomingReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroomingReservationController],
      providers: [GroomingReservationService],
    }).compile();

    controller = module.get<GroomingReservationController>(GroomingReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
