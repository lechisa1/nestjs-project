import { IsString, IsEmail, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateDepartmentDto implements Partial<CreateDepartmentDto> {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;


  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
