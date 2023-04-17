import { Localite } from './localite.model';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['localAttrilibelle'])
export class Localiteattribut{
    @PrimaryGeneratedColumn()
    localAttriid:number;
    @CreateDateColumn({update:false})
    localAttridatecreation:Date;
    @Index()
    @Column({unique:true, length: 124})
    localAttrilibelle:string;
    @Column({type:'text', nullable:true})
    localAttridescription:string;
    @Column({type:'boolean', default:true})
    localAttrienable:boolean
///une localite attribut a plusieurs localites

    @OneToMany(()=>Localite,(localite)=> localite.localiteattribut,{
        cascade:false,
    })
        localite:Localite[]

        constructor(localiteattribut:Localiteattribut){
            if(localiteattribut){
                for(const key in localiteattribut){
                    if(Object.prototype.hasOwnProperty.call(localiteattribut)){
                        this[key]=localiteattribut[key];
                    }
                }
            }
        }
}