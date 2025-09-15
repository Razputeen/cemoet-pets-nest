import { IsNotEmpty } from "class-validator";

export class CreateHotelResDto {
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
        amountDays: Date;
    
        @IsNotEmpty()
        hotelIds: number;
    
        @IsNotEmpty()
        userIds: string;
        status: string;
}
