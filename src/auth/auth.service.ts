import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(req: Request, email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const compareHash = await bcrypt.compare(password, user.password);
    if (!compareHash) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    };
    // req.session.userId = user.id;
    // req.session.role = user.role.name;
    return {
      success: true,
      message: "Logged in successfully",
      access_token: this.jwtService.sign(payload),
    };
  }
}
