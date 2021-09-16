import {MigrationInterface, QueryRunner} from "typeorm";

export class CriaTabelaTiposDeCarro1629942310094 implements MigrationInterface {
    name = 'CriaTabelaTiposDeCarro1629942310094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipos_de_carro" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_4dc1be6935137c6e5cd105fa52a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipos_de_carro"`);
    }

}
