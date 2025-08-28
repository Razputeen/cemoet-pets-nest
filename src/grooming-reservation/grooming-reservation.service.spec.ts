import { Test, TestingModule } from '@nestjs/testing';
import { GroomingReservationService } from './grooming-reservation.service';

describe('GroomingReservationService', () => {
  let service: GroomingReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroomingReservationService],
    }).compile();

    service = module.get<GroomingReservationService>(GroomingReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
