import { Ventpro } from './ventpro.model';
import { Localite } from './localite.model';
import { text } from "stream/consumers";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['zonenom'])
export class Zone{

    @PrimaryGeneratedColumn()
    zoneid:number;
    @CreateDateColumn({update:false})
    zonedatecreation:Date;
    @Index()
    @Column({unique:true, length: 124})
    zonenom:string;
    @Column({type:'text', nullable:true})
    zonedescription:string;
    @Column({type:'boolean', default:true})
    zoneenable:boolean;


    ////plusieurs localites sont dans une seule zone
    @OneToMany(()=>Localite,(localite)=>localite.zone)
localite:Localite[]
constructor(zone:Zone){
    if(zone){
        for(const key in zone){
            if(Object.prototype.hasOwnProperty.call(zone)){
                this[key]=zone[key]
            }
        }
    }
}

@OneToMany(()=>Ventpro,(ventprod)=>ventprod.zone)
ventprod:Ventpro
}