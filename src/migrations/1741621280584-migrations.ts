import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741621280584 implements MigrationInterface {
    name = 'Migrations1741621280584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."otp_tokens_type_enum" AS ENUM('email', 'password-reset')`);
        await queryRunner.query(`CREATE TABLE "otp_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "isDeactivated" boolean NOT NULL DEFAULT false, "type" "public"."otp_tokens_type_enum" NOT NULL, "userId" uuid, "plannerId" uuid, CONSTRAINT "PK_424fa4c4152eafc0b2d929e138d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "otp_tokens" ADD CONSTRAINT "FK_c1593e16a80f34b197090373ae5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otp_tokens" ADD CONSTRAINT "FK_1982be8d6b980b4047f76289d71" FOREIGN KEY ("plannerId") REFERENCES "planner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp_tokens" DROP CONSTRAINT "FK_1982be8d6b980b4047f76289d71"`);
        await queryRunner.query(`ALTER TABLE "otp_tokens" DROP CONSTRAINT "FK_c1593e16a80f34b197090373ae5"`);
        await queryRunner.query(`DROP TABLE "otp_tokens"`);
        await queryRunner.query(`DROP TYPE "public"."otp_tokens_type_enum"`);
    }

}
