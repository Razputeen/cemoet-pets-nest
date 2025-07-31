import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { Doctor } from "../entities/doctor.entity";

export class CreateDoctorDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    speciality: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^08[1-9][0-9]{7,10}$/, {message: 'Nomor telepon tidak valid (harus format Indonesia dan diawali 08)'})
    noTelp: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    quote: string
}
