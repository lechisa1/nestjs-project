import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';
@Controller('departments')
export class DepartmentsController {

    constructor(private readonly departmentService:DepartmentsService){}

    @Post()
    create(@Body() createDepartmentDto:CreateDepartmentDto){
        return this.departmentService.create(createDepartmentDto);
    }
    @Get()
    findAll(){
        return this.departmentService.findAll()
    }
    @Get(':id')
    findOne(@Param('id')id:number){
        return this.departmentService.findOne(+id)
    }

    @Patch(':id')
    update( @Param('id') id:number, @Body() updateDepartmentDtoUpdate:UpdateDepartmentDto){
        return this.departmentService.update(+id,updateDepartmentDtoUpdate)

    }
    @Delete(':id')
    delete(@Param('id')id:string){
        return this.departmentService.remove(+id)
    }

}
