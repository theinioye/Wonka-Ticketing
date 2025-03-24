import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742842131673 implements MigrationInterface {
    name = 'Migrations1742842131673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "maximumCapacity"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "maximumCapacity" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "maximumCapacity"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "maximumCapacity" integer`);
    }

}
