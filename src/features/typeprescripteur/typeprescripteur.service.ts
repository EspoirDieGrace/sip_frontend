import { Repository } from 'typeorm';
import { Typeprescripteur } from './../../models/typeprescripteur.model';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TypeprescripteurService{
    constructor(
        @InjectRepository(Typeprescripteur)
        private readonly typeprescripteurRepository:Repository<Typeprescripteur>,
    ){}
////verfification pour l'affichage de la liste des type prescripteur
    async get(id?: number) {
        if (id)
          return await this.typeprescripteurRepository.find({
            where: { typeprescripteurid: id, typeprescripteurenable: true },
          });
        return await this.typeprescripteurRepository.find({
          where: { typeprescripteurenable: true },
        });
      }

////verfification pour l'ajout' du type prescripteur
      async add(typeprescripteur: Typeprescripteur) {
        typeprescripteur.typeprescripteurlibelle = typeprescripteur.typeprescripteurlibelle.trim();
       
        delete typeprescripteur.typeprescripteurid;
        console.log('----------------ajout dun type precripteur-------');
        console.log(typeprescripteur);
        return await this.typeprescripteurRepository.save(typeprescripteur);
      }
////verfification pour la modification du type prescripteur
      async update(oldtype: Typeprescripteur, newtype: Typeprescripteur) {
        if (newtype.typeprescripteurlibelle != null) {
          oldtype.typeprescripteurlibelle = newtype.typeprescripteurlibelle.trim();
        }
   
    console.log('----------------ajout typeprescripteur-------');
    console.log(oldtype);
    return await this.typeprescripteurRepository.save(oldtype);
  }

   async delete(typeprescripteur: Typeprescripteur) {
    typeprescripteur.typeprescripteurenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(typeprescripteur);
    return await this.typeprescripteurRepository.save(typeprescripteur);
  }

}