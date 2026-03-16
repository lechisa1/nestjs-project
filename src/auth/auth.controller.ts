import { Body, Controller, Post, Req } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  signIn(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login(req, loginDto.email, loginDto.password);
  }
}
