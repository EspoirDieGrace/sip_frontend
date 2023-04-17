import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etablissement } from './../../models/etablissement.model';
@Injectable()
export class EtablissementService{
    constructor(
        @InjectRepository(Etablissement)
        private readonly etablissementRepository:Repository<Etablissement>
    ){}

    
  async get(id?: number) {
    if (id)
      return await this.etablissementRepository.find({
        where: { etablissementid: id, etablissementenable: true },
      });
    return await this.etablissementRepository.find({
      where: { etablissementenable: true },
    });
  }

  async add(etablissement: Etablissement) {
    etablissement.etablissementemail = etablissement.etablissementemail.trim();
    etablissement.categorieetablissement = etablissement.categorieetablissement
    etablissement.etablissementcontact =
    etablissement.etablissementcontact != null
        ? etablissement.etablissementcontact.trim()
        : null;
        etablissement.etablissementnom =
        etablissement.etablissementnom != null
        ? etablissement.etablissementnom.trim()
        : null;
        etablissement.etablissementdescription =
        etablissement.etablissementdescription != null
        ? etablissement.etablissementdescription.trim()
        : null;
        etablissement.etablissementjourouvrable =
        etablissement.etablissementjourouvrable != null
        ? etablissement.etablissementjourouvrable.trim()
        : null;
        etablissement.etablissementdatecreation = new Date();
    delete etablissement.etablissementid;
    console.log('----------------ajout user-------');
    console.log(etablissement);
    return await this.etablissementRepository.save(etablissement);
  }

  async update(oldetablissement: Etablissement, newetablissement: Etablissement) {
   
    if (newetablissement.etablissementnom != null) {
      oldetablissement.etablissementnom = newetablissement.etablissementnom.trim();
    }
    if (newetablissement.etablissementdescription != null) {
      oldetablissement.etablissementdescription = newetablissement.etablissementdescription.trim();
    }
    if (newetablissement.etablissementcontact != null) {
      oldetablissement.etablissementcontact = newetablissement.etablissementcontact.trim();
    }
    if (newetablissement.etablissementjourouvrable != null) {
      oldetablissement.etablissementjourouvrable = newetablissement.etablissementjourouvrable.trim();
    }

    console.log('----------------ajout user-------');
    console.log(oldetablissement);
    return await this.etablissementRepository.save(oldetablissement);
  }

  async delete(etablissement: Etablissement) {
   // utilisateur.produitupdateddate = new Date();
   etablissement.etablissementenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(etablissement);
    return await this.etablissementRepository.save(etablissement);
  }
}