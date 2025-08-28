import { IsNotEmpty, IsString } from 'class-validator';

export class AssignAlamatDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}