import { PartialType } from '@nestjs/swagger';
import { CreateGroomingReservationDto } from './create-grooming-reservation.dto';

export class UpdateGroomingReservationDto extends PartialType(CreateGroomingReservationDto) {}
