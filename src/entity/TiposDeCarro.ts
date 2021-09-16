import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { createPropertySignature } from "typescript";
import { Carro } from "./Carro";

@Entity()
export class TiposDeCarro extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    @OneToMany(() => Carro, carro => carro.tipoDeCarro)
    carros: Carro[]
}