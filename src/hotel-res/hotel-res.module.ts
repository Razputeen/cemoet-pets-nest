import { Module } from '@nestjs/common';
import { HotelResService } from './hotel-res.service';
import { HotelResController } from './hotel-res.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from '#/hotel/entities/hotel.entity';
import { User } from '#/users/entities/user.entity';
import { HotelRes } from './entities/hotel-re.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, User, HotelRes])],
  controllers: [HotelResController],
  providers: [HotelResService]
})
export class HotelResModule {}
