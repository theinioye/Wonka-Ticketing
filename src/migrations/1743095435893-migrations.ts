import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1743095435893 implements MigrationInterface {
    name = 'Migrations1743095435893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "eventId" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_5b901b19ed973dd447a275cddaa" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_0d519f57c42732d582f6d2f2cee" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_0d519f57c42732d582f6d2f2cee"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_5b901b19ed973dd447a275cddaa"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "eventId"`);
    }

}
