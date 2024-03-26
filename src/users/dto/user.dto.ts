import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsPositive, IsEmail } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  @IsString()
  userId: string;


  @IsNotEmpty()
  @IsString()
  roleId: number;


  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  gender: string;
}