import { ContratoEntity } from "src/contrato/contrato.entity";
import { HorarioEntity } from "src/horario/horario.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OfertaEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    precio: number;

    @Column()
    disponible: boolean;

    @Column()
    tipoOferta: string;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date; 

    @OneToOne( () => ContratoEntity, contrato => contrato.oferta)
    @JoinColumn()
    contrato: ContratoEntity;

    @OneToMany( () => HorarioEntity, horario => horario.oferta)
    horarios: HorarioEntity[];

    @ManyToOne(() => UsuarioEntity, usuario => usuario.ofertas)
    usuario: UsuarioEntity;
}