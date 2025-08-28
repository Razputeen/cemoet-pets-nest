import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor (
    @InjectRepository(Doctor)
    private doctorRepository : Repository<Doctor>
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = this.doctorRepository.create(createDoctorDto);
    return this.doctorRepository.save(doctor);
  }

  findAll() {
    return this.doctorRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.doctorRepository.findOneOrFail({
        where: { id,},
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
  }

  async update(id: string, UpdateDoctorDto: UpdateDoctorDto) {
    try {
      await this.doctorRepository.findOneOrFail({where: {id,},
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

    await this.doctorRepository.update(id, UpdateDoctorDto);

    return this.doctorRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return await this.doctorRepository.softDelete(id);;
  }
}
