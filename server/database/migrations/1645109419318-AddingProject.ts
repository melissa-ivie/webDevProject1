import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddingProject1645109419318 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
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
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project');
      }
    }