import { IsString, IsEmail, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
