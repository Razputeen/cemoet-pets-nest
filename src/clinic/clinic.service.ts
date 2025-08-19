import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Clinic } from '#/clinic/entities/clinic.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

 async create(dto: CreateClinicDto) {
  const user = await this.userRepository.findOneBy({
    id: dto.userIds,
  });

  if (!user) {
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  // Buat entity baru
  const newClinic = this.clinicRepository.create({
    petName: dto.petName,
    petType: dto.petType,
    petBreed: dto.petBreed,
    petAge: dto.petAge,
    appointmentDate: dto.appointmentDate,
    description: dto.description,
    user: user,
  });

  return this.clinicRepository.save(newClinic);
}


 findAll() {
   return this.clinicRepository.find({
    relations: ['user']
   });
 }
  findOne(id: number) {
    return `This action returns a #${id} clinic`;
  }
  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }
  async remove(id: string) {
    try {
      await this.clinicRepository.findOneOrFail({
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

    await this.clinicRepository.delete(id);
  }
}
