import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateClinicDto } from '#/clinic/dto/create-clinic.dto';
import { Repository } from 'typeorm';
import { User } from '#/users/entities/user.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(dto: CreateHotelDto) {
    const res = this.hotelRepository.create(dto);
    return this.hotelRepository.save(res);
  }

  findAll() {
    return this.hotelRepository.find({
      relations: ['hotelres'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
