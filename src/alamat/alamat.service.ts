import { Injectable } from '@nestjs/common';
import { CreateAlamatDto } from './dto/create-alamat.dto';
import { UpdateAlamatDto } from './dto/update-alamat.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Alamat } from './entities/alamat.entity';
import { User } from '#/users/entities/user.entity';
import { AssignAlamatDto } from './dto/assign-alamat.dto';

@Injectable()
export class AlamatService {
  constructor(
    @InjectRepository(Alamat)
    private alamatRepository: Repository<Alamat>,
  
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createAlamatDto: CreateAlamatDto) {
    let user: User | null = null;
        if (createAlamatDto.userId){
      const user = await this.userRepository.findOneByOrFail({ id: createAlamatDto.userId });
    }
    const alamat = new Alamat();
    alamat.locationName = createAlamatDto.locationName;
    alamat.penerima = createAlamatDto.penerima;
    alamat.alamat = createAlamatDto.alamat;
    alamat.user = user;

    const result = this.alamatRepository.create(createAlamatDto);
    return this.alamatRepository.save(result);
  }

    async assignAlamat(alamatId: number, assignDto: AssignAlamatDto): Promise<Alamat> {
  const alamat = await this.alamatRepository.findOneByOrFail({ id: alamatId });
  const user = await this.userRepository.findOneByOrFail({ id: assignDto.userId });

  alamat.user = user;
  return await this.alamatRepository.save(alamat);
}


  findAll() {
    return this.alamatRepository.find(
      {
        relations: ['user']
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} alamat`;
  }

  update(id: number, updateAlamatDto: UpdateAlamatDto) {
    return `This action updates a #${id} alamat`;
  }

  remove(id: number) {
    return `This action removes a #${id} alamat`;
  }
}
