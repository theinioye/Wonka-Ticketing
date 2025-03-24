import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742840912081 implements MigrationInterface {
    name = 'Migrations1742840912081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isCheckedIn" boolean NOT NULL DEFAULT false, "qrcodeurl" character varying, "eventId" uuid, "categoryId" uuid, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "price" character varying NOT NULL, "eventId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "startDate" TIMESTAMP, "googleMapUrl" character varying, "EndDate" TIMESTAMP, "isOngoing" boolean NOT NULL DEFAULT false, "maximumCapacity" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events_planners_planner" ("eventsId" uuid NOT NULL, "plannerId" uuid NOT NULL, CONSTRAINT "PK_454380a835baea039d5f98803ee" PRIMARY KEY ("eventsId", "plannerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7d09f47c242020f66d27b06fb" ON "events_planners_planner" ("eventsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_219c8327860f8872f1b56fb2b7" ON "events_planners_planner" ("plannerId") `);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_8a101375d173c39a7c1d02c9d7d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_f47458a36c743b14e0371b70a6e" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_126a8ba8e9fa928841a69580021" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_planners_planner" ADD CONSTRAINT "FK_a7d09f47c242020f66d27b06fb9" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events_planners_planner" ADD CONSTRAINT "FK_219c8327860f8872f1b56fb2b76" FOREIGN KEY ("plannerId") REFERENCES "planner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_planners_planner" DROP CONSTRAINT "FK_219c8327860f8872f1b56fb2b76"`);
        await queryRunner.query(`ALTER TABLE "events_planners_planner" DROP CONSTRAINT "FK_a7d09f47c242020f66d27b06fb9"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_126a8ba8e9fa928841a69580021"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_f47458a36c743b14e0371b70a6e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_8a101375d173c39a7c1d02c9d7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_219c8327860f8872f1b56fb2b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7d09f47c242020f66d27b06fb"`);
        await queryRunner.query(`DROP TABLE "events_planners_planner"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
    }

}
