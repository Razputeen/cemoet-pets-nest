import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { UsersModule } from '#/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), UsersModule],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
