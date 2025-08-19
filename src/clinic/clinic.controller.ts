import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
create(@Body() dto: CreateClinicDto) {
  return this.clinicService.create({
    ...dto,
    status: "Not Ready", 
  });
}
  

  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClinicDto) {
    return this.clinicService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicService.remove(id);
  }
}
