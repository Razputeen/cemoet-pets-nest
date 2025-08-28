import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phoneNum: string;
}
