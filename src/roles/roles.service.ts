import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { error } from "console";
@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: createRoleDto,
      select: {
        name: true,
        description: true,
      },
    });
    if (!role) {
      console.log("Something wrong while create role");
      return;
    }
    return {
      success: true,
      message: "Role created Successfully",
      data: role,
    };
  }

  async findAll(role?: string) {
    const roles = await this.prisma.role.findMany({
      where: role ? { name: { contains: role } } : {},
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        description: true,
      },
    });
    return {
      success: true,
      message: "Roles fetched successfully",
      data: roles,
    };
  }
  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,
      },
    });
    if (!role) {
      throw new NotFoundException(`There is no Role with this {id}`);
    }
    return {
      success: true,
      message: "Role Fetched successfully",
      data: role,
    };
  }
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(`There is no Role with this ${id}`);
    }
    const roleUpdated = await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
      select: {
        name: true,
        description: true,
      },
    });
    return {
      success: true,
      message: "Role Updated successfully",
      data: roleUpdated,
    };
  }
  async delete(id: number) {
    const role = this.prisma.role.findUnique({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(`There is no Role with this {id}`);
    }
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
