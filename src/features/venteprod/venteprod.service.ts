import { Ventpro } from './../../models/ventpro.model';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class VenteprodService{
    constructor(
        @InjectRepository(Ventpro)
        private readonly venteprodRepository:Repository<Ventpro>
    ){}

    ////verfification pour l'affichage de la liste des type prescripteur
    async get(id?: number) {
        if (id)
          return await this.venteprodRepository.find({
            where: { ventprodid: id},
          });
      }

////verfification pour l'ajout' du type prescripteur
      async add(venteprod: Ventpro) {
        venteprod.ventprodlibelle = venteprod.ventprodlibelle.trim();
       
        delete venteprod.ventprodid;
        console.log('----------------ajout dun type precripteur-------');
        console.log(venteprod);
        return await this.venteprodRepository.save(venteprod);
      }

}