import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Patch,
  Logger,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';

@Controller('clinic')
export class ClinicController {
  private readonly logger = new Logger(ClinicController.name);

  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  create(@Body() dto: CreateClinicDto) {
    return this.clinicService.create({
      ...dto,
      status: 'Not Ready',
    });
  }

  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    console.log(`PUT /clinic/${id} called with:`, dto);
    return this.clinicService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() statusDto: { status: string }) {
    this.logger.log(`PATCH /clinic/${id}/status called with:`, statusDto);
    return this.clinicService.updateStatus(id, statusDto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicService.remove(id);
  }
}
