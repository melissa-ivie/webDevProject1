"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingProject1645118952470 = void 0;
const typeorm_1 = require("typeorm");
class AddingProject1645118952470 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'project',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'projectLeaderID',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'userEmails',
                    type: 'text[]',
                    isNullable: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('project');
    }
}
exports.AddingProject1645118952470 = AddingProject1645118952470;
//# sourceMappingURL=1645118952470-AddingProjects.js.map