import { PartialType } from '@nestjs/swagger';
import { CreateAlamatDto } from './create-alamat.dto';

export class UpdateAlamatDto extends PartialType(CreateAlamatDto) {}
