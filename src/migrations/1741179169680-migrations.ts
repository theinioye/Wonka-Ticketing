import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741179169680 implements MigrationInterface {
    name = 'Migrations1741179169680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."otp_token_type_enum" AS ENUM('email', 'password-reset')`);
        await queryRunner.query(`CREATE TABLE "otp_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "isDeactivated" boolean NOT NULL, "type" "public"."otp_token_type_enum" NOT NULL, "userId" uuid, "memberId" uuid, CONSTRAINT "PK_0bfad9301f69fffbea0dcbb4eff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "planner" ADD "profileImageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "planner" ADD "hasActivatedEmail" boolean`);
        await queryRunner.query(`ALTER TABLE "planner" ADD "lastLogInDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogInDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileImageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hasActivatedEmail" boolean`);
        await queryRunner.query(`ALTER TABLE "otp_token" ADD CONSTRAINT "FK_24678d152f8409d4d266ea45510" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otp_token" ADD CONSTRAINT "FK_5cc4617df8a58d7837ebe4d8c0b" FOREIGN KEY ("memberId") REFERENCES "planner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_token" DROP CONSTRAINT "FK_5cc4617df8a58d7837ebe4d8c0b"`);
        await queryRunner.query(`ALTER TABLE "otp_token" DROP CONSTRAINT "FK_24678d152f8409d4d266ea45510"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hasActivatedEmail"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileImageUrl"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogInDate"`);
        await queryRunner.query(`ALTER TABLE "planner" DROP COLUMN "lastLogInDate"`);
        await queryRunner.query(`ALTER TABLE "planner" DROP COLUMN "hasActivatedEmail"`);
        await queryRunner.query(`ALTER TABLE "planner" DROP COLUMN "profileImageUrl"`);
        await queryRunner.query(`DROP TABLE "otp_token"`);
        await queryRunner.query(`DROP TYPE "public"."otp_token_type_enum"`);
    }

}
