import { Repository } from 'typeorm';
import { Zone } from './../../models/zone.model';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class ZoneService{

    constructor(
        @InjectRepository(Zone)
        private readonly zoneRepository : Repository<Zone>
    ){}

    async get(id?: number) {
        if (id)
          return await this.zoneRepository.find({
            where: { zoneid: id, zoneenable: true },
          });
        return await this.zoneRepository.find({
          where: { zoneenable: true },
        });
      }
      async add(zone: Zone) {
        zone.zonenom = zone.zonenom.trim();
        zone.zonedatecreation = new Date();
        delete zone.zoneid;
        console.log('----------------ajout user-------');
        console.log(zone);
        return await this.zoneRepository.save(zone);
      }
      async update(oldzone: Zone, newzone: Zone) {
        if (newzone.zonenom != null) {
            oldzone.zonenom = newzone.zonenom.trim();
        }
        console.log('----------------ajout user-------');
        console.log(oldzone);
        return await this.zoneRepository.save(oldzone);
      }
      
  async delete(zone: Zone) {
    zone.zoneenable = false;
    console.log('=============== supprimer de la base de donnee ====================');
    console.log(zone);
    return await this.zoneRepository.save(zone);
  }
    
}