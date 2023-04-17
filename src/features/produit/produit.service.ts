import { Repository } from 'typeorm';
import { Produit } from './../../models/produit.model';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProduitService{
    constructor(
        @InjectRepository(Produit)
        private readonly produitRepository:Repository<Produit>
    ){}

    async get(id?: number) {
        if (id)
          return await this.produitRepository.find({
            where: { produitid: id, produitenable: true },
          });
        return await this.produitRepository.find({
          where: { produitenable: true },
        });
      }
      async add(produit: Produit) {
        produit.produitlibelle = produit.produitlibelle.trim();
        produit.produitdescription= produit.produitdescription
        produit.produitdatecreation = new Date();
        delete produit.produitid;
        console.log('----------------ajout user-------');
        console.log(produit);
        return await this.produitRepository.save(produit);
      }
      async update(oldproduit: Produit, newproduit: Produit) {
        if (newproduit.produitlibelle != null) {
            oldproduit.produitlibelle = newproduit.produitlibelle.trim();
        }
        if(newproduit.produitdescription!=null){
            oldproduit.produitdescription=newproduit.produitdescription
        }
        console.log('----------------ajout user-------');
        console.log(oldproduit);
        return await this.produitRepository.save(oldproduit);
      }
      
  async delete(produit: Produit) {
    produit.produitenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(produit);
    return await this.produitRepository.save(produit);
  }
}