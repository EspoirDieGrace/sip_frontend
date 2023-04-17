import { Localite } from './localite.model';
import { Catetablissement } from './catetablissement.model';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['etablissementnom'])
export class Etablissement{
    @PrimaryGeneratedColumn()
    etablissementid:number;
    @CreateDateColumn({update:false})
    etablissementdatecreation:Date;
    @Index()
    @Column({unique:true, length:124})
    etablissementnom:string;
    @Column({type:'text', nullable:true})
    etablissementdescription:string;
    @Column({length:16})
    etablissementcontact:string;
    @Column({length: 124})
    etablissementemail:string;
    @Column({length: 256})
    etablissementjourouvrable:string;
    @Column({type:'boolean'})
    etablissementstatut:boolean;
    @Column({type:'boolean'})
    etablissementenable:boolean

    //plusieurs etablissement peuvent appartenir à une categorie

    @ManyToOne(()=>Catetablissement,(categorieetablissement)=>categorieetablissement.etablissement)
    categorieetablissement:Catetablissement ;
   //un étatblissement dans une localité
   @ManyToOne(()=>Localite,(localite)=>localite.etablissement)
   localite:Localite


}