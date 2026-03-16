import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll() {
    return this.prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.prisma.employee.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.employee.findUnique({
      where: { email },
    });
  }

  async findByDepartment(department: string) {
    return this.prisma.employee.findMany({
      where: { department },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findActiveEmployees() {
    return this.prisma.employee.findMany({
      where: { isActive: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
