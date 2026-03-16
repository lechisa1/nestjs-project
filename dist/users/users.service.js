"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const role = await this.prisma.role.findUnique({
            where: { id: createUserDto.roleId }
        });
        if (!role) {
            throw new common_1.NotFoundException(`Invalid id ${createUserDto.roleId}`);
        }
        const department = this.prisma.department.findUnique({
            where: { id: createUserDto.departmentId }
        });
        if (!department) {
            throw new common_1.NotFoundException(`No department with this ${createUserDto.departmentId}`);
        }
        const hashed = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashed
            },
            select: {
                name: true,
                email: true,
                role: {
                    select: {
                        name: true, description: true
                    }
                }, department: {
                    select: {
                        name: true,
                        description: true
                    }
                }
            }
        });
        return {
            success: true,
            message: "User Created successfully",
            data: user
        };
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            select: {
                name: true,
                email: true,
                role: {
                    select: {
                        name: true,
                        description: true
                    }
                },
                department: {
                    select: {
                        name: true,
                        createdAt: true
                    }
                }
            }
        });
        if (users.length === 0) {
            throw new common_1.NotFoundException("No users found");
        }
        return {
            success: true,
            message: "Users Fetched successfully",
            users
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                role: {
                    select: {
                        name: true
                    }
                },
                department: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (!user) {
            throw new common_1.NotFoundException(`No user with ${id} id`);
        }
        return {
            success: true,
            message: "User Fetched successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role.name,
                department: user.department.name,
                createdAt: user.createdAt
            }
        };
    }
    async update(id, updateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        if (updateUserDto.departmentId) {
            const department = await this.prisma.department.findUnique({
                where: { id: updateUserDto.departmentId }
            });
            if (!department) {
                throw new common_1.NotFoundException(`No department with this ${updateUserDto.departmentId}`);
            }
        }
        if (updateUserDto.roleId) {
            const role = await this.prisma.role.findUnique({
                where: { id: updateUserDto.roleId }
            });
            if (!role) {
                throw new common_1.NotFoundException(`Invalid id ${updateUserDto.roleId}`);
            }
        }
        return this.prisma.user.update({
            where: { id }, data: { ...updateUserDto }, select: {
                name: true,
                email: true,
                role: {
                    select: {
                        name: true,
                        description: true
                    }
                },
                department: {
                    select: {
                        name: true,
                        description: true
                    }
                }
            }
        });
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return this.prisma.user.delete({
            where: { id }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map