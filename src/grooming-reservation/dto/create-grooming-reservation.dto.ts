import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateGroomingReservationDto {
    @IsString()
    petName: string;

    @IsString()
    petBreed: string;

    @IsNotEmpty()
    petAge: number;

    @IsString()
    petType: string;

    @IsNotEmpty()
    bookingDate: Date;

    @IsNotEmpty()
    totalPrice: number;

    @IsNotEmpty()
    groomIds: string[]; 

    @IsNotEmpty()
    userIds: string;
}
