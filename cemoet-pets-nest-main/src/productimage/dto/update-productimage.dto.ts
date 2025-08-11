import { PartialType } from '@nestjs/swagger';
import { CreateProductimageDto } from './create-productimage.dto';

export class UpdateProductimageDto extends PartialType(CreateProductimageDto) {}
