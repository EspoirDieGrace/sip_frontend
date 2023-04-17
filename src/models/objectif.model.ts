import { Utilisateur } from 'src/models/utilisateur.model';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Objectif{
    @PrimaryGeneratedColumn()
    objectifid:number;
    @CreateDateColumn({update:false})
    objectifdatecreation:Date;
    @Column({length:124})
    objectiflibelle:string;
    @Column({type:'text',nullable:true})
    objectifdescription:string;
    @Column({type:'boolean', default:true})
    objectifenable:boolean


    ///plusieurs objectifs appartiennenent à un utilisateur
    @ManyToOne(()=>Utilisateur,(utilisateur)=>utilisateur.objectif)
    utilisateur:Utilisateur
}