"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRefreshToken1637631042877 = void 0;
const typeorm_1 = require("typeorm");
class AddRefreshToken1637631042877 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'refresh_token',
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
            ],
        }));
        await queryRunner.createForeignKey('refresh_token', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('refresh_token');
    }
}
exports.AddRefreshToken1637631042877 = AddRefreshToken1637631042877;
//# sourceMappingURL=1637631042877-AddRefreshToken.js.map