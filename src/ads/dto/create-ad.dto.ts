import { IsString, IsUrl, IsBoolean, IsOptional } from "class-validator";

export class CreateAdDto {
  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
