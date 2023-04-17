import { Produit } from './produit.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Zone } from './zone.model';

@Entity()
export class Ventpro{
    @PrimaryGeneratedColumn()
    ventprodid:number;
    @Column()
    ventprodlibelle:string;
    @Column()
    ventprodnbre:number;

    ///plusieurs ventes produits peuvent concerner un produit
    @ManyToOne(()=>Produit,(produit)=>produit.ventprod)
    produit:Produit;
    constructor(ventprod:Ventpro){
        if(ventprod){
            for(const key in ventprod){
                if(Object.prototype.hasOwnProperty.call(ventprod)){
                    this[key]=ventprod[key]
                }
            }
        }
    }
    ///plusieurs ventes produits peuvent s'effectuer dans une zone
    @ManyToOne(()=>Zone,(zone)=>zone.ventprod)
    zone:Zone
}