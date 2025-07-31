
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlamatDto {
    @IsNotEmpty()
    @IsString()
    locationName: string;

    @IsNotEmpty()
    @IsString()
    penerima: string;

    @IsNotEmpty()
    @IsString()
    alamat: string;

    @IsOptional()
    @IsString()
    userId: string;  // Penting: Bukan `user_id` (pakai camelCase di DTO best practice)
}