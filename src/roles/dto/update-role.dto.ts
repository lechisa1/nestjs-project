import { IsOptional ,IsString} from "class-validator";
import { CreateRoleDto } from "./create-role.dto";


export class UpdateRoleDto implements Partial <CreateRoleDto>{
      @IsOptional()
      @IsString()
      name?: string;
    
      @IsOptional()
      @IsString()
      description?: string;
}