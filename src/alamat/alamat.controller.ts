import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlamatService } from './alamat.service';
import { CreateAlamatDto } from './dto/create-alamat.dto';
import { UpdateAlamatDto } from './dto/update-alamat.dto';
import { AssignAlamatDto } from './dto/assign-alamat.dto';
import { Alamat } from './entities/alamat.entity';

@Controller('alamat')
export class AlamatController {
  constructor(private readonly alamatService: AlamatService) {}

  @Post()
  create(@Body() createAlamatDto: CreateAlamatDto) {
    return this.alamatService.create(createAlamatDto);
  }

  @Get()
  findAll() {
    return this.alamatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alamatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlamatDto: UpdateAlamatDto) {
    return this.alamatService.update(+id, updateAlamatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alamatService.remove(+id);
  }

    @Patch(':id/assign')
  async assignAlamat(
    @Param('id') id: number,
    @Body() assignDto: AssignAlamatDto
  ): Promise<Alamat> {
    return await this.alamatService.assignAlamat(id, assignDto);
  }
}
