import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { GroomingReservation } from '../grooming-reservation/entities/grooming-reservation.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, GroomingReservation, Role])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // supaya bisa diakses AuthModule atau modul lain
})
export class UsersModule {}
