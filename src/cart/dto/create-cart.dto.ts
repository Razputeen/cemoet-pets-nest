import { IsInt, Min } from "class-validator";

export class CreateCartDto {}
export class AddToCartDto {
  @IsInt()
  @Min(1)
  quantity: number;

  productId: string;
}