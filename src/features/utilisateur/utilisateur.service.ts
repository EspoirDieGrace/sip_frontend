import { Repository } from 'typeorm';
import { Utilisateur } from './../../models/utilisateur.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilisateurDto } from 'src/dto/utilisateur.dto';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async get(id?: number) {
    if (id)
      return await this.utilisateurRepository.find({
        where: { utilisateurid: id, utilisateurenable: true },
      });
    return await this.utilisateurRepository.find({
      where: { utilisateurenable: true },
    });
  }

  async add(utilisateur: Utilisateur) {
    utilisateur.utilisateuremail = utilisateur.utilisateuremail.trim();
    utilisateur.role = utilisateur.role
    utilisateur.utilisateurcontact =
      utilisateur.utilisateurcontact != null
        ? utilisateur.utilisateurcontact.trim()
        : null;
    utilisateur.utilisateurnom =
      utilisateur.utilisateurnom != null
        ? utilisateur.utilisateurnom.trim()
        : null;
    utilisateur.utilisateurprenom =
      utilisateur.utilisateurprenom != null
        ? utilisateur.utilisateurprenom.trim()
        : null;
    utilisateur.utilisateurpassword;
    utilisateur.utilisateurdatecreation = new Date();
    utilisateur.utilisateurdatenaissance;
    delete utilisateur.utilisateurid;
    console.log('----------------ajout user-------');
    console.log(utilisateur);
    return await this.utilisateurRepository.save(utilisateur);
  }

  async update(olduser: Utilisateur, new_utilisateur: Utilisateur) {
   
    if (new_utilisateur.utilisateurnom != null) {
      olduser.utilisateurnom = new_utilisateur.utilisateurnom.trim();
    }
    if (new_utilisateur.utilisateurprenom != null) {
      olduser.utilisateurprenom = new_utilisateur.utilisateurprenom.trim();
    }
    if (new_utilisateur.utilisateurcontact != null) {
      olduser.utilisateurcontact = new_utilisateur.utilisateurcontact.trim();
    }

    console.log('----------------ajout user-------');
    console.log(olduser);
    return await this.utilisateurRepository.save(olduser);
  }

  async delete(utilisateur: Utilisateur) {
   // utilisateur.produitupdateddate = new Date();
    utilisateur.utilisateurenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(utilisateur);
    return await this.utilisateurRepository.save(utilisateur);
  }
}
