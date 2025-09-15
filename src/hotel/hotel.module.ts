import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import { Hotel } from './entities/hotel.entity';
import { HotelRes } from '#/hotel-res/entities/hotel-re.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HotelRes, Hotel])],
  controllers: [HotelController],
  providers: [HotelService]
})
export class HotelModule {}
