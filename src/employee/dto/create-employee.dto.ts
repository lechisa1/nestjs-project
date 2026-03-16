import { IsString, IsEmail, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Salary must be a number' })
  salary?: number;

  @IsOptional()
  @IsDateString()
  hireDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
