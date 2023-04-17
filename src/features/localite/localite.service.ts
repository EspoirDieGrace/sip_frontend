import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localite } from './../../models/localite.model';
@Injectable()
export class LocaliteService{
    constructor(
        @InjectRepository(Localite)
        private readonly localiteRepository:Repository<Localite>
    ){}

     async get(id?: number) {
        if (id)
          return await this.localiteRepository.find({
            where: { localiteid: id, localiteenable: true },
          });
        return await this.localiteRepository.find({
          where: { localiteenable: true },
        });
      }
      async add(localite: Localite) {
        localite.localitelibelle = localite.localitelibelle.trim();
        localite.localitedatecreation = new Date();
        delete localite.localiteid;
        console.log('----------------ajout localite-------');
        console.log(localite);
        return await this.localiteRepository.save(localite);
      }
      async update(oldlocalite: Localite, newlocalite: Localite) {
        if (newlocalite.localitelibelle != null) {
            oldlocalite.localitelibelle = newlocalite.localitelibelle.trim();
        }
        console.log('----------------ajout user-------');
        console.log(oldlocalite);
        return await this.localiteRepository.save(oldlocalite);
      }
      
  async delete(localite: Localite) {
    localite.localiteenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(localite);
    return await this.localiteRepository.save(localite);
  }
}