"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser1637028716848 = void 0;
const typeorm_1 = require("typeorm");
class AddUser1637028716848 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'firstName',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'lastName',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'passwordHash',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'text',
                    isNullable: false,
                    isUnique: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.AddUser1637028716848 = AddUser1637028716848;
//# sourceMappingURL=1637028716848-AddUser.js.map