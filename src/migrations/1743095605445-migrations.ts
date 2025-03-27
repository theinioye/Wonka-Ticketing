import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1743095605445 implements MigrationInterface {
    name = 'Migrations1743095605445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "quantity" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "quantity"`);
    }

}
