"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_CONTEXT_KEY = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("../entities/role.entity");
exports.ROLES_CONTEXT_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_CONTEXT_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map