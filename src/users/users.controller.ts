import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  //the below is guard route means only authenticated user can access
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll() {
    const users = this.userService.findAll();
    if (!users) {
      throw new NotFoundException("No users found");
    }
    return users;
  }
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const newUser = this.userService.update(id, updateUserDto);

    if (!newUser) {
      console.log("Error while updating user");
    }
    return newUser;
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
