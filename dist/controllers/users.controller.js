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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_body_decorator_1 = require("../decorators/jwt_body.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
const skip_decorator_1 = require("../decorators/skip.decorator");
const create_user_dto_1 = require("../dto/create_user.dto");
const jwt_body_dto_1 = require("../dto/jwt_body.dto");
const refresh_token_entity_1 = require("../entities/refresh_token.entity");
const role_entity_1 = require("../entities/role.entity");
const user_entity_1 = require("../entities/user.entity");
const user_role_entity_1 = require("../entities/user_role.entity");
const auth_guard_1 = require("../providers/guards/auth.guard");
const jwt_service_1 = require("../providers/services/jwt.service");
const refresh_tokens_service_1 = require("../providers/services/refresh_tokens.service");
const roles_service_1 = require("../providers/services/roles.service");
const users_service_1 = require("../providers/services/users.service");
let UsersController = class UsersController {
    constructor(usersService, rolesService, jwtService, refreshTokenService) {
        this.usersService = usersService;
        this.rolesService = rolesService;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }
    async index() {
        const users = await this.usersService.findAll();
        return { users };
    }
    async getCurrentUser(jwtBody) {
        const user = await this.usersService.find(jwtBody.userId);
        return { user };
    }
    async create(userPayload, res) {
        const newUser = new user_entity_1.User();
        newUser.email = userPayload.email;
        newUser.firstName = userPayload.firstName;
        newUser.lastName = userPayload.lastName;
        newUser.passwordHash = await bcrypt.hash(userPayload.password, 10);
        const [role] = await this.rolesService.findByKey(role_entity_1.RoleKey.USER);
        const userRole = new user_role_entity_1.UserRole();
        userRole.role = role;
        newUser.userRoles = [userRole];
        try {
            const user = await this.usersService.create(newUser);
            const newRefreshToken = new refresh_token_entity_1.RefreshToken();
            newRefreshToken.user = user;
            const refreshToken = await this.refreshTokenService.create(newRefreshToken);
            const token = this.jwtService.issueToken({ userId: user.id, roles: [role_entity_1.RoleKey.USER] });
            const refreshJwtToken = this.jwtService.issueRefreshToken({ id: refreshToken.id, userId: user.id });
            res.cookie('_refresh_token', refreshJwtToken, {
                httpOnly: true,
            });
            return { user, token };
        }
        catch (e) {
            throw new common_1.HttpException(`User creation failed. ${e.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('/users'),
    (0, roles_decorator_1.Roles)(role_entity_1.RoleKey.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/users/me'),
    __param(0, (0, jwt_body_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('/users'),
    (0, skip_decorator_1.Skip)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        roles_service_1.RolesService,
        jwt_service_1.JwtService,
        refresh_tokens_service_1.RefreshTokensService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map