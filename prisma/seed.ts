import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "System Administrator",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
      description: "Normal User",
    },
  });

  // Permissions
  const permissions = [
    { module: "users", action: "create", name: "users:create" },
    { module: "users", action: "read", name: "users:read" },
    { module: "users", action: "update", name: "users:update" },
    { module: "users", action: "delete", name: "users:delete" },

    { module: "departments", action: "create", name: "departments:create" },
    { module: "departments", action: "read", name: "departments:read" },
    { module: "departments", action: "update", name: "departments:update" },
    { module: "departments", action: "delete", name: "departments:delete" },
  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    });
  }

  // Get all permissions
  const allPermissions = await prisma.permission.findMany();

  // Assign ALL permissions to Admin
  for (const perm of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: perm.id,
      },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
