import { Typeprescripteur } from './typeprescripteur.model';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['prescripteuremail'])
export class Prescripteur{
    @PrimaryGeneratedColumn()
    prescripteurid:number;
    @Column({type:'text'})
    prescripteurnom:string;
    @Column({type:'text'})
    prescripteurprenom:string;
    @Column({type:'text'})
    prescripteurcontact:string;
    @Index()
    @Column({unique:true, length: 124})
    prescripteuremail:string;
    @CreateDateColumn({update:false})
    prescripteurdatecreation:Date;
    @Column({type:'boolean', default:true})
    prescriteurenable:boolean




    //plusieurs prescripteurs peuvent appartenir à un type
@ManyToOne(()=>Typeprescripteur,(typeprescripteur)=>typeprescripteur.prescripteur)
typeprescripteur:Typeprescripteur


}
