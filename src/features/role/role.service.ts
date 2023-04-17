import { Role } from './../../models/role.model';
import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';




@Injectable()
export class RoleService{
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository:Repository<Role>,
    ){}
////afficher la liste des roles
    async get( id?:number){
        if(id)
        return await this.roleRepository.find({
            where : {roleid:id,roleenable:true}
        });
        return await this.roleRepository.find({
            where : {roleenable:true}
        })
    }
///ajouter un role
    async add(role: Role) {
        role.roledata = role.roledata.trim();
        role.rolenom = role.rolenom.trim()
        delete role.roleid;
        console.log('----------------ajout user-------');
        console.log(role);
        return await this.roleRepository.save(role);
      }
////modifier un role
      async update(oldrole: Role, newrole: Role) {
   
        if (newrole.roledata != null) {
            oldrole.roledata = newrole.roledata.trim();
        }
        if (newrole.rolenom != null) {
            oldrole.rolenom = newrole.rolenom.trim();
        }
        console.log('----------------ajout user-------');
        console.log(oldrole);
        return await this.roleRepository.save(oldrole);
      }


      ///Supprimer un role
      async delete(role: Role) {
        // utilisateur.produitupdateddate = new Date();
         role.roleenable = false;
         console.log('=============== supprimer de la base de donnee ====================');
         console.log(role);
         return await this.roleRepository.save(role);
       }
}