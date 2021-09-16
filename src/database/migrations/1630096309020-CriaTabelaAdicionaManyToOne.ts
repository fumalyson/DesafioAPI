import {MigrationInterface, QueryRunner} from "typeorm";

export class CriaTabelaAdicionaManyToOne1630096309020 implements MigrationInterface {
    name = 'CriaTabelaAdicionaManyToOne1630096309020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."carro" DROP CONSTRAINT "FK_6cbb3ddd0c4452b6996f82961a3"`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ALTER COLUMN "tipos_de_carro_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."carro" DROP CONSTRAINT "UQ_6cbb3ddd0c4452b6996f82961a3"`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ADD CONSTRAINT "FK_6cbb3ddd0c4452b6996f82961a3" FOREIGN KEY ("tipos_de_carro_id") REFERENCES "tipos_de_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."carro" DROP CONSTRAINT "FK_6cbb3ddd0c4452b6996f82961a3"`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ADD CONSTRAINT "UQ_6cbb3ddd0c4452b6996f82961a3" UNIQUE ("tipos_de_carro_id")`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ALTER COLUMN "tipos_de_carro_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."carro" ADD CONSTRAINT "FK_6cbb3ddd0c4452b6996f82961a3" FOREIGN KEY ("tipos_de_carro_id") REFERENCES "tipos_de_carro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
