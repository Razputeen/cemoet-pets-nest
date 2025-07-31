import { Module } from '@nestjs/common';
import { GroomingReservationService } from './grooming-reservation.service';
import { GroomingReservationController } from './grooming-reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groom } from '#/grooms/entities/groom.entity';
import { GroomingReservation } from './entities/grooming-reservation.entity';
import { User } from '#/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroomingReservation, Groom, User])],
  controllers: [GroomingReservationController],
  providers: [GroomingReservationService]
})
export class GroomingReservationModule {}
