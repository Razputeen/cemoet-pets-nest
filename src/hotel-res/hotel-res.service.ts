import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelResDto } from './dto/create-hotel-re.dto';
import { UpdateHotelReDto } from './dto/update-hotel-re.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRes } from './entities/hotel-re.entity';
import { Repository } from 'typeorm';
import { User } from '#/users/entities/user.entity';
import { Hotel } from '#/hotel/entities/hotel.entity';

@Injectable()
export class HotelResService {
  constructor(
    @InjectRepository(HotelRes)
    private readonly hotelresRepository: Repository<HotelRes>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(dto: CreateHotelResDto) {
    const user = await this.userRepository.findOneBy({
      id: dto.userIds,
    });
    const hotel = await this.hotelRepository.findOneBy({
      id: Number(dto.hotelIds),
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newHotel = this.hotelresRepository.create({
      petName: dto.petName,
      petType: dto.petType,
      petBreed: dto.petBreed,
      petAge: dto.petAge,
      appointmentDate: dto.appointmentDate,
      amountDays: dto.amountDays,
      hotel: hotel,
      status: dto.status || 'Not Ready',
      user: user,
    });

    return this.hotelresRepository.save(newHotel);
  }

    async updateStatus(id: string, status: string) {
    try {
      console.log(`Updating hotel with ID: ${id} to status: ${status}`);

      const existingClinic = await this.hotelresRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!existingClinic) {
        throw new HttpException('Hotel not found', HttpStatus.NOT_FOUND);
      }

      const updateData = { status };
      console.log(`Update data:`, updateData);

      const updateResult = await this.hotelresRepository.update(id, updateData);
      console.log(`Update result:`, updateResult);

      const updatedHotel = await this.hotelresRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      return {
        success: true,
        message: 'Status updated successfully',
        data: updatedHotel,
      };
    } catch (error) {
      console.error(`Error updating status:`, error);
      throw new HttpException(
        `Failed to update status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.hotelresRepository.find({
      relations: ['user', 'hotel']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelRe`;
  }

  update(id: number, updateHotelReDto: UpdateHotelReDto) {
    return `This action updates a #${id} hotelRe`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelRe`;
  }
}
