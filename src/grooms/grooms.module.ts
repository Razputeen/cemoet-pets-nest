import { Module } from '@nestjs/common';
import { GroomsService } from './grooms.service';
import { GroomsController } from './grooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroomingReservation } from '#/grooming-reservation/entities/grooming-reservation.entity';
import { Groom } from './entities/groom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroomingReservation, Groom])],
  controllers: [GroomsController],
  providers: [GroomsService]
})
export class GroomsModule {}
