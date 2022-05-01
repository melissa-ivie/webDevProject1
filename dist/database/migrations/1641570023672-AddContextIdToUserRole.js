"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddContextIdToUserRole1641570023672 = void 0;
const typeorm_1 = require("typeorm");
class AddContextIdToUserRole1641570023672 {
    async up(queryRunner) {
        await queryRunner.addColumn('user_role', new typeorm_1.TableColumn({
            name: 'contextId',
            type: 'text',
            default: "'root'",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('user_role', 'contextId');
    }
}
exports.AddContextIdToUserRole1641570023672 = AddContextIdToUserRole1641570023672;
//# sourceMappingURL=1641570023672-AddContextIdToUserRole.js.map