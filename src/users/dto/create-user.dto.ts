import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;

  @IsInt()
  departmentId: number;
}