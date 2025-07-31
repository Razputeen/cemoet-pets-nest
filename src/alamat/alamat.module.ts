import { Module } from '@nestjs/common';
import { AlamatService } from './alamat.service';
import { AlamatController } from './alamat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '#/users/entities/user.entity';
import { Alamat } from './entities/alamat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alamat, User])],
  controllers: [AlamatController],
  providers: [AlamatService]
})
export class AlamatModule {}
