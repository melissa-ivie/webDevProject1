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
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const config_1 = require("./database/config");
const users_module_1 = require("./modules/users.module");
const auth_guard_1 = require("./providers/guards/auth.guard");
const roles_guard_1 = require("./providers/guards/roles.guard");
const jwt_service_1 = require("./providers/services/jwt.service");
const roles_service_1 = require("./providers/services/roles.service");
const users_service_1 = require("./providers/services/users.service");
const guard_util_1 = require("./providers/util/guard.util");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot(config_1.config), users_module_1.UsersModule],
        controllers: [app_controller_1.AppController],
        providers: [
            users_service_1.UsersService,
            roles_service_1.RolesService,
            jwt_service_1.JwtService,
            guard_util_1.GuardUtil,
            { provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map