import { InjectRepository } from '@nestjs/typeorm';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Clinic } from '#/clinic/entities/clinic.entity';
import { User } from './../users/entities/user.entity';

@Injectable()
export class ClinicService {
  private readonly logger = new Logger(ClinicService.name);

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

    const newClinic = this.clinicRepository.create({
      petName: dto.petName,
      petType: dto.petType,
      petBreed: dto.petBreed,
      petAge: dto.petAge,
      appointmentDate: dto.appointmentDate,
      description: dto.description,
      status: dto.status || 'Not Ready',
      user: user,
    });

    return this.clinicRepository.save(newClinic);
  }

  findAll() {
    return this.clinicRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string) {
    try {
      this.logger.log(`Finding clinic with ID: ${id}`);

      const clinic = await this.clinicRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!clinic) {
        throw new HttpException('Clinic not found', HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        data: clinic,
      };
    } catch (error) {
      this.logger.error(`Error finding clinic: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch clinic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateClinicDto: any) {
    try {
      this.logger.log(`Updating clinic with ID: ${id}`);
      this.logger.log(`Update data:`, updateClinicDto);

      const existingClinic = await this.clinicRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!existingClinic) {
        throw new HttpException('Clinic not found', HttpStatus.NOT_FOUND);
      }

      // Update hanya status
      const updateData = {
        status: updateClinicDto.status,
      };

      this.logger.log(`Final update data:`, updateData);

      const updateResult = await this.clinicRepository.update(id, updateData);
      
      this.logger.log(`Update result:`, updateResult);

      if (updateResult.affected === 0) {
        throw new HttpException('No records updated', HttpStatus.NOT_FOUND);
      }

      const updatedClinic = await this.clinicRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      return {
        success: true,
        message: 'Clinic updated successfully',
        data: updatedClinic,
      };
    } catch (error) {
      this.logger.error(`Error updating clinic: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to update clinic: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      console.log(`Updating clinic with ID: ${id} to status: ${status}`);

      const existingClinic = await this.clinicRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!existingClinic) {
        throw new HttpException('Clinic not found', HttpStatus.NOT_FOUND);
      }

      const updateData = { status };
      console.log(`Update data:`, updateData);

      const updateResult = await this.clinicRepository.update(id, updateData);
      console.log(`Update result:`, updateResult);

      const updatedClinic = await this.clinicRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      return {
        success: true,
        message: 'Status updated successfully',
        data: updatedClinic,
      };
    } catch (error) {
      console.error(`Error updating status:`, error);
      throw new HttpException(
        `Failed to update status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.clinicRepository.findOneOrFail({
        where: { id },
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

    return {
      success: true,
      message: 'Clinic deleted successfully',
    };
  }
}