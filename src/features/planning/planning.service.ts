import { Repository } from 'typeorm';
import { Planning } from './../../models/planning.model';
import { Injectable, PlainLiteralObject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class PlanningService{
    constructor(
        @InjectRepository(Planning)
        private readonly planningRepository:Repository<Planning>
    ){}

    
      async get(id?: number) {
          if (id)
            return await this.planningRepository.find({
              where: { planningid: id, planningenable: true },
            });
          return await this.planningRepository.find({
            where: {planningenable: true },
          });
      }
      async add(planning: Planning) {
        planning.planningdatedebut = planning.planningdatefin;
        planning.planningdatefin = planning.planningdatefin;
        planning.planningdatecreation=new Date
        delete planning.planningid;
        console.log('----------------ajout user-------');
        console.log(planning);
        return await this.planningRepository.save(planning);
      }
      async update(oldplanning: Planning, newplanning: Planning) {
        if (newplanning.planningdatedebut != null) {
            oldplanning.planningdatedebut = newplanning.planningdatedebut;
        }
        if(newplanning.planningdatefin != null){
            oldplanning.planningdatefin = newplanning.planningdatefin;
        }
        console.log('----------------ajout user-------');
        console.log(oldplanning);
        return await this.planningRepository.save(oldplanning);
      }
      async delete(planning: Planning) {
        planning.planningenable = false;
        console.log('=============== supprimer de la base de donnee ====================');
        console.log(planning);
        return await this.planningRepository.save(planning);
      }
}