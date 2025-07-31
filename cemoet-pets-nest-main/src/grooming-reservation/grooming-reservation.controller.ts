import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { GroomingReservationService } from './grooming-reservation.service';
import { CreateGroomingReservationDto } from './dto/create-grooming-reservation.dto';
import { UpdateGroomingReservationDto } from './dto/update-grooming-reservation.dto';

@Controller('grooming-reservation')
export class GroomingReservationController {
  constructor(private readonly groomingReservationService: GroomingReservationService) {}

  @Post()
  create(@Body() createGroomingReservationDto: CreateGroomingReservationDto) {
    return this.groomingReservationService.create(createGroomingReservationDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.groomingReservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groomingReservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroomingReservationDto: UpdateGroomingReservationDto) {
    return this.groomingReservationService.update(+id, updateGroomingReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groomingReservationService.remove(id);
  }
}
