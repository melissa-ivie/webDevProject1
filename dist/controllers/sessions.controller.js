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
exports.SessionsController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../providers/services/users.service");
const sign_in_dto_1 = require("../dto/sign_in.dto");
const jwt_service_1 = require("../providers/services/jwt.service");
const refresh_tokens_service_1 = require("../providers/services/refresh_tokens.service");
const refresh_token_entity_1 = require("../entities/refresh_token.entity");
const skip_decorator_1 = require("../decorators/skip.decorator");
const auth_guard_1 = require("../providers/guards/auth.guard");
const roles_service_1 = require("../providers/services/roles.service");
const jwt_body_decorator_1 = require("../decorators/jwt_body.decorator");
const jwt_body_dto_1 = require("../dto/jwt_body.dto");
let SessionsController = class SessionsController {
    constructor(usersService, jwtService, rolesService, refreshTokenService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.rolesService = rolesService;
        this.refreshTokenService = refreshTokenService;
    }
    async create(body, res) {
        const { verified, user } = await this.usersService.verify(body.email, body.password);
        if (!verified) {
            throw new common_1.HttpException('Invalid email or password.', common_1.HttpStatus.BAD_REQUEST);
        }
        let refreshToken = user.refreshTokens[0];
        if (!refreshToken) {
            const newRefreshToken = new refresh_token_entity_1.RefreshToken();
            newRefreshToken.user = user;
            refreshToken = await this.refreshTokenService.create(newRefreshToken);
        }
        const userRoles = await this.rolesService.findByIds(user.userRoles.map((ur) => ur.roleId));
        const token = this.jwtService.issueToken({ userId: user.id, roles: userRoles.map((r) => r.key) });
        const refreshJwtToken = this.jwtService.issueRefreshToken({ id: refreshToken.id, userId: user.id });
        res.cookie('_refresh_token', refreshJwtToken, {
            httpOnly: true,
        });
        return { token };
    }
    async destroy(res, jwtBody) {
        const user = await this.usersService.find(jwtBody.userId, ['refreshTokens']);
        await this.refreshTokenService.destroy(...user.refreshTokens);
        res.clearCookie('_refresh_token');
        return { success: true };
    }
};
__decorate([
    (0, common_1.Post)('/sessions'),
    (0, skip_decorator_1.Skip)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/sessions'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, jwt_body_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "destroy", null);
SessionsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_service_1.JwtService,
        roles_service_1.RolesService,
        refresh_tokens_service_1.RefreshTokensService])
], SessionsController);
exports.SessionsController = SessionsController;
//# sourceMappingURL=sessions.controller.js.map