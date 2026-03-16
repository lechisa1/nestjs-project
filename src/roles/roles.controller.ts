import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { AuthGuard } from "@nestjs/passport";
@Controller("roles")
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll(@Query("role") role?: string) {
    return this.roleService.findAll(role);
  }
  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.roleService.findOne(id);
  }
  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }
  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  deleteRole(@Param("id") id: number) {
    return this.roleService.delete(id);
  }
}
