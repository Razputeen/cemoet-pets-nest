import { Injectable } from '@nestjs/common';
import { CreateGroomDto } from './dto/create-groom.dto';
import { UpdateGroomDto } from './dto/update-groom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Groom } from './entities/groom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroomsService {
  constructor (
    @InjectRepository(Groom)
    private groomRepository: Repository<Groom>,
  ) {}
  create(createGroomDto: CreateGroomDto) {
    const groom = this.groomRepository.create(createGroomDto);
    return this.groomRepository.save(groom);
  }

  findAll() {
    return this.groomRepository.find(
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} groom`;
  }

  update(id: number, updateGroomDto: UpdateGroomDto) {
    return `This action updates a #${id} groom`;
  }

  remove(id: number) {
    return `This action removes a #${id} groom`;
  }
}
