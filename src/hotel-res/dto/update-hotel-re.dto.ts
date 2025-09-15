import { PartialType } from '@nestjs/swagger';
import { CreateHotelResDto } from './create-hotel-re.dto';

export class UpdateHotelReDto extends PartialType(CreateHotelResDto) {}
