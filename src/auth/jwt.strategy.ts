// src/auth/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "my-secret-key-so-dont-share-this-key",
    });
  }

  async validate(payload: any) {
    // This will be attached to req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
