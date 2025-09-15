import { IsNotEmpty } from "class-validator";

export class CreateHotelDto {
        @IsNotEmpty()
        name: string;

        @IsNotEmpty()
        price: number;
}
