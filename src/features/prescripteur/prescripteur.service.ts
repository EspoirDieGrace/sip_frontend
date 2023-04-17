import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescripteur } from './../../models/prescripteur.model';
@Injectable()
export class PrescripteurService{
    constructor(
        @InjectRepository(Prescripteur)
        private readonly prescripteurRepository:Repository<Prescripteur>
    ){}
      async get(id?: number) {
    if (id)
      return await this.prescripteurRepository.find({
        where: { prescripteurid: id, prescriteurenable: true },
      });
    return await this.prescripteurRepository.find({
      where: { prescriteurenable: true },
    });
  }

   async add(prescripteur: Prescripteur) {
    prescripteur.prescripteuremail = prescripteur.prescripteuremail.trim();
    prescripteur.typeprescripteur = prescripteur.typeprescripteur
    prescripteur.prescripteurcontact =
    prescripteur.prescripteurcontact != null
        ? prescripteur.prescripteurcontact.trim()
        : null;
        prescripteur.prescripteurnom =
        prescripteur.prescripteurnom != null
        ? prescripteur.prescripteurnom.trim()
        : null;
        prescripteur.prescripteurprenom =
        prescripteur.prescripteurprenom != null
        ? prescripteur.prescripteurprenom.trim()
        : null;
        prescripteur.prescripteurdatecreation = new Date();
    delete prescripteur.prescripteurid;
    console.log('----------------ajout prescripteur-------');
    console.log(prescripteur);
    return await this.prescripteurRepository.save(prescripteur);
  }

  async update(oldprescripteur: Prescripteur, newprescripteur: Prescripteur) {
   
    if (newprescripteur.prescripteurnom != null) {
        oldprescripteur.prescripteurnom = newprescripteur.prescripteurnom.trim();
    }
    if (newprescripteur.prescripteurprenom != null) {
        oldprescripteur.prescripteurprenom = newprescripteur.prescripteurprenom.trim();
    }
    if (newprescripteur.prescripteurcontact != null) {
        oldprescripteur.prescripteurcontact = newprescripteur.prescripteurcontact.trim();
    }

    console.log('----------------ajout user-------');
    console.log(oldprescripteur);
    return await this.prescripteurRepository.save(oldprescripteur);
  }

  async delete(prescriteur: Prescripteur) {
    // utilisateur.produitupdateddate = new Date();
    prescriteur.prescriteurenable = false;
     console.log('=============== supprimer de la base de donnee ====================');
     console.log(prescriteur);
     return await this.prescripteurRepository.save(prescriteur);
   }
}