import {MigrationInterface, QueryRunner} from "typeorm";

export class CriaTabelaUsuarios1630086411140 implements MigrationInterface {
    name = 'CriaTabelaUsuarios1630086411140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."carro" DROP CONSTRAINT "carro_tipos_de_carro_id_fkey"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ALTER COLUMN "tipos_de_carro_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ADD CONSTRAINT "UQ_6cbb3ddd0c4452b6996f82961a3" UNIQUE ("tipos_de_carro_id")`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ADD CONSTRAINT "FK_6cbb3ddd0c4452b6996f82961a3" FOREIGN KEY ("tipos_de_carro_id") REFERENCES "tipos_de_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."carro" DROP CONSTRAINT "FK_6cbb3ddd0c4452b6996f82961a3"`);
        await queryRunner.query(`ALTER TABLE "public"."carro" DROP CONSTRAINT "UQ_6cbb3ddd0c4452b6996f82961a3"`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ALTER COLUMN "tipos_de_carro_id" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ADD CONSTRAINT "carro_tipos_de_carro_id_fkey" FOREIGN KEY ("tipos_de_carro_id") REFERENCES "tipos_de_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
