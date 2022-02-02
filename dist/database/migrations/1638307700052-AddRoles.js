"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRoles1638307700052 = void 0;
const typeorm_1 = require("typeorm");
class AddRoles1638307700052 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'role',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'key',
                    type: 'text',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_role',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'roleId',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createForeignKey('user_role', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_role', new typeorm_1.TableForeignKey({
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'role',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user_role');
        await queryRunner.dropTable('role');
    }
}
exports.AddRoles1638307700052 = AddRoles1638307700052;
//# sourceMappingURL=1638307700052-AddRoles.js.map