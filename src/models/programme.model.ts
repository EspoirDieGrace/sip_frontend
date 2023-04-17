import { Planning } from './planning.model';
import { ManyToMany, OneToMany } from 'typeorm';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, Unique } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Produit } from './produit.model';
@Entity()
@Unique(['programmelibelle'])
export class Programme{
    @PrimaryGeneratedColumn()
    programmeid:number;
    @CreateDateColumn()
    programmedatecreation:Date;
    @Column({type:'boolean',default:true})
    programmeenable:boolean;
    @Index()
    @Column({unique:true, length:124})
    programmelibelle:string;
    @Column()
    programmedescription:string;
    @Column()
    programmedate:Date


//plusieurs programme peuvent concerner plusieurs produits
@ManyToMany(()=>Produit, produit=>produit.programme)
produit:Produit[]

///plusieurs programme son dans un programme

@ManyToOne(()=>Planning,(planning)=>planning.programme)
planning:Planning[]

    constructor(programme?:Programme){
        if(programme){
            for (const test in programme){
                if(Object.prototype.hasOwnProperty.call(programme, test)){
                    this[test]=programme[test]
                }
            }
        }
    }
}