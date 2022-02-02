"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const jwt_body_dto_1 = require("../../dto/jwt_body.dto");
const role_entity_1 = require("../../entities/role.entity");
const roles_service_1 = require("../services/roles.service");
const users_service_1 = require("../services/users.service");
const lodash_1 = require("lodash");
let RolesGuard = class RolesGuard {
    constructor(reflector, usersService, rolesService) {
        this.reflector = reflector;
        this.usersService = usersService;
        this.rolesService = rolesService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_CONTEXT_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const jwtBody = context.switchToHttp().getRequest().jwtBody;
        if (!jwtBody)
            return false;
        return !(0, lodash_1.isEmpty)((0, lodash_1.intersection)(jwtBody.roles, requiredRoles));
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, users_service_1.UsersService, roles_service_1.RolesService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map