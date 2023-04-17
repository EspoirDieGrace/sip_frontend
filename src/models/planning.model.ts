import { Programme } from './programme.model';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Planning{
    @PrimaryGeneratedColumn()
    planningid:number;
    @CreateDateColumn({update:false})
    planningdatecreation:Date
    @Column()
    planningdatedebut:Date;
    @Column()
    planningdatefin:Date;
    @Column({type:'boolean',default:true})
    planningenable:boolean


    ///dans un planning il y a plusieurs programmes
@OneToMany(()=>Programme,(programme)=>programme.planning)
programme:Programme[]
constructor(planninng:Planning){
    if(planninng){
        for(const key in planninng){
            if(Object.prototype.hasOwnProperty.call(planninng)){
                this[key]=planninng[key]
            }
        }
    }
}
}