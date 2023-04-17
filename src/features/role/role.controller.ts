import { Role } from './../../models/role.model';
import { RoleService } from './role.service';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from "@nestjs/common";


@Controller('role')
export class RoleController{
    private readonly logger = new Logger(RoleController.name);
    constructor(
        private roleService:RoleService
    ){}

    //afficher la liste des roles
    @Get('getall')
    async getAll(@Query('roleid')roleid){
        this.logger.log('debut liste des roles');
        if(roleid && isNaN(roleid)){
            throw new BadRequestException({
                message:'role id doit être un nombre',
            })
        }
        let roles = [];
        try{
           roles = await this.roleService.get (roleid);
        }catch(error){
            throw new InternalServerErrorException({
                message : 'erreur interne',
            })
        }
        if(roles.length==0){
            throw new HttpException('',HttpStatus.NO_CONTENT);
        }
        return roles;
    }

    @Post('add')
    async addRole(@Body() body:Role){
        console.log(body);
        if(
            body.roledata==null||body.roledata.length==0 || 
            body.rolenom==null||body.rolenom.length==0
        ){
            console.log(body.roledata);
            console.log(body.rolenom);
            
            throw new BadRequestException({
                message:'certains champs obligatoires sont manquants',
            });
        }
        try{
            return this.roleService.add(body);
        }catch (error) {
                if (error.code == '23503')
                  throw new BadRequestException({ message: error.detail });
                if (error.code == '23505')
                  throw new BadRequestException({ message: error.detail });
                else
                  throw new InternalServerErrorException({
                    message: 'erreur interne du serveur ',
                  });
              }
        }

    @Put('update/:id')
    async updateRole(
        @Param('id') roleid:number,
        @Body() body : Role
    ){
        console.log(body);
        if(roleid && isNaN(roleid)){
            throw new BadRequestException({
                message: 'role id must be a number',
              });
        }

        ////////verification
        const roles : Role[] = await this.roleService.get(roleid)
        if(!roles || roles.length == 0){
            throw new HttpException('ok', HttpStatus.NO_CONTENT);
        }

        if( body.roledata==null||body.roledata.length==0 || 
            body.rolenom==null||body.rolenom.length==0){
                throw new BadRequestException({
                  message: 'certains champs obligatoires sont manquants',
                });
            }
            try {
              return this.roleService.update(roles[0], body);
            } catch (error) {
              if (error.code == '23503')
                throw new BadRequestException({ message: error.detail });
              if (error.code == '23505')
                throw new BadRequestException({ message: error.detail });
              else
                throw new InternalServerErrorException({
                  message: 'erreur interne du serveur ',
                });
            }
    }

    @Delete('delete/:id')
    async deleteRole(@Param('id')roleid:number){
        this.logger.log('rrrrrrrrrrrrrrrrrrdelete');
        if(roleid && isNaN(roleid)){
            throw new BadRequestException({
                message: 'role id must be a number',
              });
        }

        const roles: Role[] = await this.roleService.get(roleid);
        if (!roles || roles.length == 0) {
          throw new HttpException('', HttpStatus.NO_CONTENT);
        }
        // ---- FIN
        const roleToUpdate: Role = roles[0];
        try {
          await this.roleService.delete(roleToUpdate);
          return 'role deleted';
        } catch (error) {
          if (error.code == '23503') throw new BadRequestException({ message: error.detail });
          if (error.code == '23505') throw new ConflictException({ message: error.detail });
          // Duplicate Key contraints
          else
            throw new InternalServerErrorException({
              message: 'Erreur interne du serveur',
            });
        }

    }




}