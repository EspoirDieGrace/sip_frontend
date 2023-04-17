import { Zone } from './zone.model';
import { Localiteattribut } from './localiteattribut.model';
import { Etablissement } from './etablissement.model';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['localitelibelle'])
export class Localite{

    @PrimaryGeneratedColumn()
    localiteid:number;
    @CreateDateColumn({update:false})
    localitedatecreation:Date;
    @Index()
    @Column({unique:true, length:124})
    localitelibelle:string;
    @Column({type:'text', nullable:true})
    localitedescription:string;
    @Column({type:'boolean', default:true})
    localiteenable:boolean;
///dans une localite, il peut avoir plusieyrs etablissement
    @OneToMany(()=>Etablissement,(etablissement)=>etablissement.localite,{
        cascade:false,
    })
    etablissement:Etablissement[]

    constructor(localite:Localite){
        if(localite){
            for(const key in localite){
                if(Object.prototype.hasOwnProperty.call(localite)){
                    this[key]=localite[key];
                }
            }
        }
    }
//il ya plusieurs localite dans une localite attribut
    @ManyToOne(()=>Localiteattribut,(localiteattribut)=>localiteattribut.localite)
    localiteattribut:Localiteattribut;

///il ya plusieurs localités dans une zone
    @ManyToOne(()=>Zone,(zone)=>zone.localite)
    zone:Zone
}