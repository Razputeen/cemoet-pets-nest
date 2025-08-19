import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { Clinic } from './entities/clinic.entity';
import { User } from '#/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, User])],
  controllers: [ClinicController],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
