import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Programme } from 'src/models/programme.model';

@Injectable()
export class ProgrammeService{
    constructor(
        @InjectRepository(Programme)
        private readonly programmeRepository:Repository<Programme>
    ){}

    async get(id?: number) {
        if (id)
          return await this.programmeRepository.find({
            where: { programmeid: id, programmeenable: true },
          });
        return await this.programmeRepository.find({
          where: { programmeenable: true },
        });
      }
      async add(programme: Programme) {
        programme.programmelibelle = programme.programmelibelle.trim();
        programme.programmedatecreation = new Date();
        delete programme.programmeid;
        console.log('----------------ajout user-------');
        console.log(programme);
        return await this.programmeRepository.save(programme);
      }
      async update(oldprogramme: Programme, newprogramme: Programme) {
        if (newprogramme.programmelibelle != null) {
            oldprogramme.programmelibelle = newprogramme.programmelibelle.trim();
        }
        console.log('----------------ajout user-------');
        console.log(oldprogramme);
        return await this.programmeRepository.save(oldprogramme);
      }
      
  async delete(programme: Programme) {
    programme.programmeenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(programme);
    return await this.programmeRepository.save(programme);
  }

}