
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
@Injectable()
export class DepartmentsService {
      constructor(private prisma: PrismaService) {}
    
      async create(createEmployeeDto:CreateDepartmentDto ) {
        return this.prisma.department.create({
          data: createEmployeeDto,
        });
      }
        async findAll() {
          return this.prisma.department.findMany({
            orderBy: {
              createdAt: 'desc',
            },
          });
        }
      
        async findOne(id: number) {
          const employee = await this.prisma.department.findUnique({
            where: { id },
          });
      
          if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
          }
      
          return employee;
        }
      
        async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
          const employee = await this.prisma.department.findUnique({
            where: { id },
          });
      
          if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
          }
      
          return this.prisma.department.update({
            where: { id },
            data: updateDepartmentDto,
          });
        }
      
        async remove(id: number) {
          const employee = await this.prisma.department.findUnique({
            where: { id },
          });
      
          if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
          }
      
          return this.prisma.department.delete({
            where: { id },
          });
        }
      
}
