import { Prescripteur } from './prescripteur.model';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['typeprescripteurlibelle'])
export class Typeprescripteur{
    @PrimaryGeneratedColumn()
    typeprescripteurid:number;
    @CreateDateColumn({update:false })
    typeprescripteurdatecreation:Date;
    @Column({type:'boolean', default:true})
    typeprescripteurenable:boolean;
    @Index()
    @Column({unique:true, length: 124})
    typeprescripteurlibelle:string;
    @Column({type:'text',nullable:true})
    typeprescripteurdescription:string

    
//à un type peuvent appartenir plusieurs prescripteurs
@OneToMany(()=>Prescripteur,(prescripteur)=>prescripteur,{
    cascade:false,
})
prescripteur:Prescripteur[]

constructor(typeprescripteur?:Typeprescripteur){
    if(typeprescripteur){
        for(const test in typeprescripteur){
            if(Object.prototype.hasOwnProperty.call(typeprescripteur, test)){
                this[test]=typeprescripteur[test]
            }
        }
    }
}
}