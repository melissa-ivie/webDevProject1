"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skip = exports.SKIP_KEY = void 0;
const common_1 = require("@nestjs/common");
const class_dto_1 = require("../dto/class.dto");
exports.SKIP_KEY = 'skip';
const Skip = (...guards) => (0, common_1.SetMetadata)(exports.SKIP_KEY, guards);
exports.Skip = Skip;
//# sourceMappingURL=skip.decorator.js.map