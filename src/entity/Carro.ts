import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, RelationId, JoinColumn, } from "typeorm";
import { TiposDeCarro } from "./TiposDeCarro";

@Entity()
export class Carro extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    @Column()
    marca: string;
    @ManyToOne(() => TiposDeCarro, tipo => tipo.carros)
    @JoinColumn({name:'tipos_de_carro_id',referencedColumnName: 'id'})
    tipoDeCarro: TiposDeCarro
    @RelationId((carro: Carro) => carro.tipoDeCarro)
    tipoDeCarroId: number


}