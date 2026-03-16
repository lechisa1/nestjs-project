import { UpdateDepartmentDto } from './../departments/dto/update-department.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}


      // cretate users
   async create(createUserDto:CreateUserDto){
    const role= await this.prisma.role.findUnique({
        where:{id:createUserDto.roleId}
    });
    if(!role){
        throw new NotFoundException(`Invalid id ${createUserDto.roleId}`)
    }
        const department=this.prisma.department.findUnique({
        where:{id:createUserDto.departmentId}
    });
    if(!department){
        throw new NotFoundException(`No department with this ${createUserDto.departmentId}`)
    }
        const hashed= await bcrypt.hash(createUserDto.password,10);
        const user= await this.prisma.user.create({
            data:{
                ...createUserDto,
                password:hashed
            },
            select:{
                name:true,
                email:true,
                role:{
                    select:{
                        name:true,description:true
                    }
                },department:{
                    select:{
                        name:true,
                        description:true
                    }
                }
            }
        })
        return {
            success:true,
            message:"User Created successfully",
            data:user
        }
    }
    //get users function

    async findAll(){
        const users= await this.prisma.user.findMany({
            select:{
                name:true,
                email:true,
                role:{
                    select:{
                        name:true,
                        description:true
                    }
                },
                department:{
                    select:{
                        name:true,
                        createdAt:true
                    }
                }
            }
 
        });
        if(users.length===0){
            throw new NotFoundException("No users found")
        }
        return {
            success:true,
            message:"Users Fetched successfully",
            users
        }
    }
// here get user by id
async findOne(id: number) {
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
    throw new NotFoundException(`No user with ${id} id`);
  }

  return {
    success:true,
    message:"User Fetched successfully",
    user:{
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.name,
    department: user.department.name,
    createdAt: user.createdAt
    }

  };
}
// update users functions
    async update(id:number,updateUserDto:UpdateUserDto){
     
        if(updateUserDto.password){
            updateUserDto.password=await bcrypt.hash(updateUserDto.password,10)
        }
        if(updateUserDto.departmentId){
                    const department= await this.prisma.department.findUnique({
        where:{id:updateUserDto.departmentId}
    });
        if(!department){
        throw new NotFoundException(`No department with this ${updateUserDto.departmentId}`)
    }
        }
        if(updateUserDto.roleId){
                const role= await this.prisma.role.findUnique({
        where:{id:updateUserDto.roleId}
    });
    if(!role){
        throw new NotFoundException(`Invalid id ${updateUserDto.roleId}`)
    }
        }
        return this.prisma.user.update({
            where:{id},data:{...updateUserDto},select:{
                name:true,
                email:true,
                role:{
                    select:{
                        name:true,
                        description:true
                    }
                },
                department:{
                    select:{
                        name:true,
                        description:true
                    }
                }
            }
        })
    }

    // remove users
    async remove(id:number){
        const user=await this.prisma.user.findUnique({
            where:{id}
        })
        if(!user){
            throw new NotFoundException("User not found")
        }
        return this.prisma.user.delete({
            where:{id}
        })
    }

}
