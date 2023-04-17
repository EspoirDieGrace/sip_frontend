import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Catetablissement} from "src/models/catetablissement.model";
import { Repository } from "typeorm";


@Injectable()
export class CategorieetablissementService{
    constructor(
        @InjectRepository(Catetablissement)
        private readonly catetablissementRepository:Repository<Catetablissement>
    ){}

    async get(id?: number) {
        if (id)
          return await this.catetablissementRepository.find({
            where: { catetabid: id, catetabenable: true },
          });
        return await this.catetablissementRepository.find({
          where: { catetabenable: true },
        });
      }
      async add(catetab: Catetablissement) {
        catetab.catetablibelle = catetab.catetablibelle.trim();
        catetab.catetabdatecreation = new Date();
        delete catetab.catetabid;
        console.log('----------------ajout user-------');
        console.log(catetab);
        return await this.catetablissementRepository.save(catetab);
      }
      async update(oldcatetab: Catetablissement, newcatetab: Catetablissement) {
        if (newcatetab.catetablibelle != null) {
            oldcatetab.catetablibelle = newcatetab.catetablibelle.trim();
        }
        console.log('----------------ajout user-------');
        console.log(oldcatetab);
        return await this.catetablissementRepository.save(oldcatetab);
      }
      
  async delete(catetablissement: Catetablissement) {
    catetablissement.catetabenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(catetablissement);
    return await this.catetablissementRepository.save(catetablissement);
  }
}