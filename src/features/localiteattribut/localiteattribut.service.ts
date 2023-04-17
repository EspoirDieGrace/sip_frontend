import { Repository } from 'typeorm';
import { Localiteattribut } from './../../models/localiteattribut.model';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LocaliteattributService{
    constructor(
        @InjectRepository(Localiteattribut)
        private readonly localiteatttributRepository:Repository<Localiteattribut>
    ){}

    async get(id?: number) {
        if (id)
          return await this.localiteatttributRepository.find({
            where: { localAttriid: id, localAttrienable: true },
          });
        return await this.localiteatttributRepository.find({
          where: { localAttrienable: true },
        });
      }
      async add(localiteattribut: Localiteattribut) {
        localiteattribut.localAttrilibelle = localiteattribut.localAttrilibelle.trim();
        localiteattribut.localAttridatecreation = new Date();
        delete localiteattribut.localAttriid;
        console.log('----------------ajout user-------');
        console.log(localiteattribut);
        return await this.localiteatttributRepository.save(localiteattribut);
      }
      async update(oldlocalAttri: Localiteattribut, newlocalAttri: Localiteattribut) {
        if (newlocalAttri.localAttrilibelle != null) {
            oldlocalAttri.localAttrilibelle = newlocalAttri.localAttrilibelle.trim();
        }
        console.log('----------------ajout user-------');
        console.log(oldlocalAttri);
        return await this.localiteatttributRepository.save(oldlocalAttri);
      }
      
  async delete(localiteattribut: Localiteattribut) {
    localiteattribut.localAttrienable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(localiteattribut);
    return await this.localiteatttributRepository.save(localiteattribut);
  }
}