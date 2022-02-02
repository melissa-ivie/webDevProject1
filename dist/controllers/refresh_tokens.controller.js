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
exports.RefreshTokensController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../providers/services/users.service");
const sign_in_dto_1 = require("../dto/sign_in.dto");
const refresh_token_body_dto_1 = require("../dto/refresh_token_body.dto");
const jwt_service_1 = require("../providers/services/jwt.service");
const skip_decorator_1 = require("../decorators/skip.decorator");
const auth_guard_1 = require("../providers/guards/auth.guard");
const roles_service_1 = require("../providers/services/roles.service");
let RefreshTokensController = class RefreshTokensController {
    constructor(usersService, rolesService, jwtService) {
        this.usersService = usersService;
        this.rolesService = rolesService;
        this.jwtService = jwtService;
    }
    async get(body, req) {
        const refreshToken = req.cookies['_refresh_token'];
        if (!refreshToken) {
            throw new common_1.HttpException('No refresh token present', 401);
        }
        const tokenBody = this.jwtService.parseRefreshToken(refreshToken);
        const user = await this.usersService.find(tokenBody.userId, ['refreshTokens', 'userRoles']);
        const roles = await this.rolesService.findByIds(user.userRoles.map((ur) => ur.roleId));
        const userRefreshToken = user.refreshTokens.find((t) => t.id === tokenBody.id);
        if (!userRefreshToken) {
            throw new common_1.HttpException('User refresh token not found', 401);
        }
        const token = this.jwtService.issueToken({ userId: user.id, roles: roles.map((r) => r.key) });
        return { token };
    }
};
__decorate([
    (0, common_1.Get)('/refresh_token'),
    (0, skip_decorator_1.Skip)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], RefreshTokensController.prototype, "get", null);
RefreshTokensController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, roles_service_1.RolesService, jwt_service_1.JwtService])
], RefreshTokensController);
exports.RefreshTokensController = RefreshTokensController;
//# sourceMappingURL=refresh_tokens.controller.js.map