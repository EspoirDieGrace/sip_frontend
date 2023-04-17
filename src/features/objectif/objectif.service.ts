import { Repository } from 'typeorm';
import { Objectif } from './../../models/objectif.model';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ObjectifService{
    constructor(
        @InjectRepository(Objectif)
        private readonly objectifRepository: Repository<Objectif>
    ){}

    async get(id?: number) {
        if (id)
          return await this.objectifRepository.find({
            where: { objectifid: id, objectifenable: true },
          });
        return await this.objectifRepository.find({
          where: { objectifenable: true },
        });
      }
      async add(objectif: Objectif) {
        objectif.objectiflibelle = objectif.objectiflibelle.trim();
        objectif.objectifdatecreation = new Date();
        delete objectif.objectifid;
        console.log('----------------ajout user-------');
        console.log(objectif);
        return await this.objectifRepository.save(objectif);
      }
      async update(oldobjectif: Objectif, newobjectif: Objectif) {
        if (newobjectif.objectiflibelle != null) {
            oldobjectif.objectiflibelle = newobjectif.objectiflibelle.trim();
        }
        console.log('----------------ajout user-------');
        console.log(oldobjectif);
        return await this.objectifRepository.save(oldobjectif);
      }
      
  async delete(objectif: Objectif) {
    objectif.objectifenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(objectif);
    return await this.objectifRepository.save(objectif);
  }
}