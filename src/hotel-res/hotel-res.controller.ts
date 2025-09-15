import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { HotelResService } from './hotel-res.service';
import { CreateHotelResDto } from './dto/create-hotel-re.dto';
import { UpdateHotelReDto } from './dto/update-hotel-re.dto';

@Controller('hotel-res')
export class HotelResController {
    private readonly logger = new Logger(HotelResController.name);

  constructor(private readonly hotelResService: HotelResService) {}

  @Post()
  create(@Body() createHotelReDto: CreateHotelResDto) {
    return this.hotelResService.create(createHotelReDto);
  }

  @Get()
  findAll() {
    return this.hotelResService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelResService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelReDto: UpdateHotelReDto) {
    return this.hotelResService.update(+id, updateHotelReDto);
  }

    @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() statusDto: { status: string }) {
    this.logger.log(`PATCH /clinic/${id}/status called with:`, statusDto);
    return this.hotelResService.updateStatus(id, statusDto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelResService.remove(+id);
  }
}
