import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { GroomingReservation } from '#/grooming-reservation/entities/grooming-reservation.entity';
import { Role } from '#/role/entities/role.entity';
import { Cart } from '#/cart/entities/cart.entity';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, GroomingReservation, Role, Cart])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
