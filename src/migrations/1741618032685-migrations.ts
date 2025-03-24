import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1741618032685 implements MigrationInterface {
  name = 'Migrations1741618032685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp_token" DROP CONSTRAINT "FK_5cc4617df8a58d7837ebe4d8c0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp_token" RENAME COLUMN "memberId" TO "plannerId"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "houseAddress"`);
    await queryRunner.query(
      `ALTER TABLE "otp_token" ADD CONSTRAINT "FK_a5d571ac5f5d51d9bb35824a731" FOREIGN KEY ("plannerId") REFERENCES "planner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp_token" DROP CONSTRAINT "FK_a5d571ac5f5d51d9bb35824a731"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "houseAddress" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp_token" RENAME COLUMN "plannerId" TO "memberId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "otp_token" ADD CONSTRAINT "FK_5cc4617df8a58d7837ebe4d8c0b" FOREIGN KEY ("memberId") REFERENCES "planner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
