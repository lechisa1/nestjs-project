// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import session from "express-session";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // Use Winston as the global logger
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log" }),
      ],
    }),
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Sessions
  app.use(
    session({
      secret:
        process.env.SESSION_SECRET || "my-secret-key-go-here-and-not-share-it",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  // Static uploads
  app.useStaticAssets("uploads", {
    prefix: "/uploads/",
  });

  // Global prefix & CORS
  app.setGlobalPrefix("api");
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
