"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const sessions_controller_1 = require("../controllers/sessions.controller");
const users_controller_1 = require("../controllers/users.controller");
const users_service_1 = require("../providers/services/users.service");
const refresh_tokens_service_1 = require("../providers/services/refresh_tokens.service");
const refresh_token_entity_1 = require("../entities/refresh_token.entity");
const jwt_service_1 = require("../providers/services/jwt.service");
const refresh_tokens_controller_1 = require("../controllers/refresh_tokens.controller");
const role_entity_1 = require("../entities/role.entity");
const roles_service_1 = require("../providers/services/roles.service");
const user_role_entity_1 = require("../entities/user_role.entity");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, refresh_token_entity_1.RefreshToken, role_entity_1.Role, user_role_entity_1.UserRole])],
        controllers: [sessions_controller_1.SessionsController, users_controller_1.UsersController, refresh_tokens_controller_1.RefreshTokensController],
        providers: [users_service_1.UsersService, roles_service_1.RolesService, refresh_tokens_service_1.RefreshTokensService, jwt_service_1.JwtService],
        exports: [typeorm_1.TypeOrmModule],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map