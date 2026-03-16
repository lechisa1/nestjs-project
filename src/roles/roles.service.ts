import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { error } from "console";
import { permission } from "process";
@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { permissions, ...roleData } = createRoleDto;

    const role = await this.prisma.role.create({
      data: {
        ...roleData,
        permissions: permissions
          ? {
              create: permissions.map((permissionId) => ({
                permission: { connect: { id: permissionId } },
              })),
            }
          : undefined,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Role created successfully",
      data: role,
    };
  }
  async assignPermissions(roleId: number, permissionIds: number[]) {
    await this.prisma.rolePermission.createMany({
      data: permissionIds.map((id) => ({
        roleId,
        permissionId: id,
      })),
    });

    return {
      success: true,
      message: "Permissions assigned successfully",
    };
  }
  // async findAll(role?: string) {
  //   const roles = await this.prisma.role.findMany({
  //     where: role ? { name: { contains: role } } : {},
  //     orderBy: { createdAt: "desc" },
  //     select: {
  //       name: true,
  //       description: true,

  //     },
  //   });
  //   return {
  //     success: true,
  //     message: "Roles fetched successfully",
  //     data: roles,
  //   };
  // }
  async findAll(role?: string) {
    const roles = await this.prisma.role.findMany({
      where: role ? { name: { contains: role } } : {},
      orderBy: { createdAt: "desc" },
      include: {
        permissions: {
          include: {
            permission: true, // this fetches actual permission details
          },
        },
      },
    });

    // Optionally, map to make it cleaner
    const formattedRoles = roles.map((r) => ({
      name: r.name,
      description: r.description,
      permissions: r.permissions.map((p) => ({
        id: p.permission.id,
        name: p.permission.name,
        description: p.permission.description,
      })),
    }));

    return {
      success: true,
      message: "Roles fetched successfully",
      data: formattedRoles,
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
