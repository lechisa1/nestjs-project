import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EmployeeModule } from "./employee/employee.module";
import { PrismaModule } from "./prisma/prisma.module";
import { DepartmentsModule } from "./departments/departments.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { UploadModule } from "./upload/upload.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EmployeeModule,
    DepartmentsModule,
    UsersModule,
    RolesModule,
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL }); // all routes
  }
}
