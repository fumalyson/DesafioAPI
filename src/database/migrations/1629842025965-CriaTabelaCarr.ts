import {MigrationInterface, QueryRunner} from "typeorm";

export class CriaTabelaCarr1629842025965 implements MigrationInterface {
    name = 'CriaTabelaCarr1629842025965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carro" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "marca" character varying NOT NULL, CONSTRAINT "PK_e96f1ee721c762a97d5686aab0d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "carro"`);
    }

}
