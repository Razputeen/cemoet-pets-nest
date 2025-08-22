import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GroomingReservationService } from '#/grooming-reservation/grooming-reservation.service';
import { GroomingReservation } from '#/grooming-reservation/entities/grooming-reservation.entity';
import { Role } from '#/role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(GroomingReservation)
    private groomingReservationRepository: GroomingReservationService,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const defaultRole = await this.rolesRepository.findOneBy({
      id: '2',
    });
    if (!defaultRole) {
      throw new Error('Default role tidak ditemukan');
    }
      const result = this.usersRepository.create({ ...createUserDto, role: defaultRole,
      });
    return this.usersRepository.save(result);
  }

  findAll() {
    return this.usersRepository.find(
      {
        relations: ['role', 'reserveGroom', 'cart']
      }
    );
  }

  async findOneByName(Name: string) {
  try {
    return await this.usersRepository.findOneOrFail({
      where: { Name },
      relations: ['role', 'reserveGroom', 'cart']
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

  async findOneWithGroom(id: string) {
  return this.usersRepository.findOne({
    where: { id },
    relations: ['reserveGroom', 'cart'],
  });
}

    async findOne(id: string) {
  try {
    return await this.usersRepository.findOneOrFail({
      where: { id },
      relations: ['role', 'reserveGroom', 'cart']
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.findOneOrFail({
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

    await this.usersRepository.update(id, updateUserDto);

    return this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.usersRepository.findOneOrFail({
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

    await this.usersRepository.delete(id);
  }
}
