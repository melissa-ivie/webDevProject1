"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtBody = void 0;
const common_1 = require("@nestjs/common");
exports.JwtBody = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.jwtBody;
});
//# sourceMappingURL=jwt_body.decorator.js.map