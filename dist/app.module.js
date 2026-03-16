"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const employee_module_1 = require("./employee/employee.module");
const prisma_module_1 = require("./prisma/prisma.module");
const departments_module_1 = require("./departments/departments.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const auth_module_1 = require("./auth/auth.module");
const upload_module_1 = require("./upload/upload.module");
const logging_middleware_1 = require("./middleware/logging.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.LoggingMiddleware)
            .forRoutes({ path: "*", method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            employee_module_1.EmployeeModule,
            departments_module_1.DepartmentsModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map