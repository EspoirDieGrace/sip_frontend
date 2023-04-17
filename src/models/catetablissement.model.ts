import { Etablissement } from './etablissement.model';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['catetablibelle'])
export class Catetablissement{

    @PrimaryGeneratedColumn()
    catetabid:number;
    @CreateDateColumn({update:false})
    catetabdatecreation:Date;
    @Column({type:'boolean', default:true})
    catetabenable:boolean;
    @Index()
    @Column({unique:true,length:124})
    catetablibelle:string;
    @Column({type:'text', nullable:true})
    catetabdescription:string;

    //une catégorie d'établissement a plusieurs établissement
    @OneToMany(()=>Etablissement,(etablissement)=>etablissement.categorieetablissement,{
        cascade:false,
    })
    etablissement:Etablissement[]

    constructor(catetablissement?:Catetablissement){
        if(catetablissement){
            for(const test in catetablissement){
                if(Object.prototype.hasOwnProperty.call(catetablissement , test)){
                    this[test]=catetablissement[test];
                }
            }
        }
    }

    
}