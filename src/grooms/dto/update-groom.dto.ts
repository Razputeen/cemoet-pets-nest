import { PartialType } from '@nestjs/swagger';
import { CreateGroomDto } from './create-groom.dto';

export class UpdateGroomDto extends PartialType(CreateGroomDto) {}
