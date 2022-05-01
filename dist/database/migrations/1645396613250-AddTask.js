"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTask1645396613250 = void 0;
const typeorm_1 = require("typeorm");
class AddTask1645396613250 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'task',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'projectId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'assignedUserId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'timeEstimation',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'projectID',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'assignee',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('task');
    }
}
exports.AddTask1645396613250 = AddTask1645396613250;
//# sourceMappingURL=1645396613250-AddTask.js.map