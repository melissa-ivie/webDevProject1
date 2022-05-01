"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const jwt_body_dto_1 = require("../../dto/jwt_body.dto");
const refresh_token_body_dto_1 = require("../../dto/refresh_token_body.dto");
let JwtService = class JwtService {
    issueToken(body, expiresIn = '15m', key = process.env.ENCRYPTION_KEY) {
        return jwt.sign(body, key, { expiresIn });
    }
    issueRefreshToken(body) {
        return this.issueToken(body, '1y', process.env.REFRESH_ENCRYPTION_KEY);
    }
    parseToken(token, key = process.env.ENCRYPTION_KEY) {
        try {
            return jwt.verify(token, key);
        }
        catch (e) {
            throw new common_1.HttpException('Invalid jwt token', 401);
        }
    }
    parseRefreshToken(token) {
        return this.parseToken(token, process.env.REFRESH_ENCRYPTION_KEY);
    }
};
JwtService = __decorate([
    (0, common_1.Injectable)()
], JwtService);
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map