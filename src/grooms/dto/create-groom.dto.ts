import { IsNotEmpty } from "class-validator";

export class CreateGroomDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    specification: string;
}
