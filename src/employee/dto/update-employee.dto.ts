import { IsString, IsEmail, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto implements Partial<CreateEmployeeDto> {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

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
