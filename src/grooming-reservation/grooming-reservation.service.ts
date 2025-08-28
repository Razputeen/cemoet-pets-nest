import { User } from './../users/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroomingReservationDto } from './dto/create-grooming-reservation.dto';
import { UpdateGroomingReservationDto } from './dto/update-grooming-reservation.dto';
import { Groom } from '#/grooms/entities/groom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GroomingReservation } from './entities/grooming-reservation.entity';
import { EntityNotFoundError, In, Repository } from 'typeorm';

@Injectable()
export class GroomingReservationService {
  constructor(
    @InjectRepository(Groom)
    private groomRepository: Repository<Groom>,
    @InjectRepository(GroomingReservation)
    private reservationRepository: Repository<GroomingReservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}
  async create(dto: CreateGroomingReservationDto) {
    const grooming = await this.groomRepository.findBy({ id: In(dto.groomIds), });
    const user = await this.userRepository.findOneBy({ id: dto.userIds });

    const reservation = this.reservationRepository.create({
      petName: dto.petName,
      petBreed: dto.petBreed,
      petAge: dto.petAge,
      petType: dto.petType,
      bookingDate: dto.bookingDate,
      totalPrice: dto.totalPrice,
      groomings: grooming,
      user: user,
      status: 'Pending',
      isActivated: true,
    });

    return this.reservationRepository.save(reservation);
}

  findAll() {
    return this.reservationRepository.find({
      relations: ['user', 'groomings'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} groomingReservation`;
  }

  update(id: number, updateGroomingReservationDto: UpdateGroomingReservationDto) {
    return `This action updates a #${id} groomingReservation`;
  }

  async remove(id: string) {
        try {
          await this.reservationRepository.findOneOrFail({
            where: {
              id,
            },
          });
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }
    
        await this.reservationRepository.delete(id);
  }
}
