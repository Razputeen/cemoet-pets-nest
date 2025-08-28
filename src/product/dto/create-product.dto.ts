import { IsNotEmpty, IsString } from "class-validator";


export class CreateProductDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    stock: number

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    brand: string

    @IsNotEmpty()
    specification: string

    @IsNotEmpty()
    weight: number
}
