import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateClinicDto {
    @IsNotEmpty()
    petName: string;
    
    @IsNotEmpty()
    petType: string;

    @IsNotEmpty()
    petBreed: string;

    @IsNotEmpty()
    petAge:number;

    @IsNotEmpty()
    appointmentDate:Date;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    userIds: string;
    status: string;
}
