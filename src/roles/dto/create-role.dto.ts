import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsInt,
} from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  permissions?: number[];
}
