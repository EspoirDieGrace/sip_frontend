import { Column, CreateDateColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn,
Entity, Unique, Index, OneToMany
} from "typeorm";
import { Programme } from "./programme.model";
import { Ventpro } from "./ventpro.model";

@Entity()
@Unique(['produitlibelle'])
export class Produit{
    @PrimaryGeneratedColumn()
    produitid:number;
    @CreateDateColumn()
    produitdatecreation:Date;
    @Column({ default:true, type:'boolean'})
    produitenable:boolean;
    @Index()
    @Column({unique:true, length:124})
    produitlibelle:string;
    @Column({type:'text', nullable:true})
    produitdescription:string;
//plusieurs produits sont concernés par plusieurs programmes
    @ManyToMany(()=>Programme, programme =>programme.produit)
    @JoinTable()
    programme:Programme[]

    @OneToMany(()=>Ventpro,(ventprod)=>ventprod.produit)
    ventprod:Ventpro[]
}