import { BadRequestException, Body, ConflictException, Delete, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from '@nestjs/common';

import { Controller, Get } from '@nestjs/common';
import { Etablissement } from 'src/models/etablissement.model';
import { Utilisateur } from 'src/models/utilisateur.model';
import { EtablissementService } from './etablissement.service';

@Controller('etablissement')
export class EtablissementController {
  private readonly logger = new Logger (EtablissementController.name)
  constructor(private etablissementService:EtablissementService) {}

   //afficher la liste de tous les utilisateurs
   @Get('getall')
   async getAll(@Query('etablissementid') etablissementid) {
     this.logger.log('debut liste des etablissements');
     if (etablissementid && isNaN(etablissementid)) {
       throw new BadRequestException({
         message: 'utilisateur id doit être un nombre',
       });
     }
     let etablissement= [];
     try {
      etablissement = await this.etablissementService.get(etablissementid);
     } catch (error) {
       throw new InternalServerErrorException({
         message: 'Erreur interne',
       });
     }
     if (etablissement.length == 0) {
       throw new HttpException('', HttpStatus.NO_CONTENT);
     }
     return etablissement;
   }
 
   @Post('add')
   async addEtablissement(@Body() body: Etablissement) {
     console.log(body);
 
     if (
       body.etablissementemail == null ||
       body.etablissementemail.length == 0 ||
       body.etablissementnom == null ||
       body.etablissementdescription.length == 0 ||
       body.etablissementcontact == null ||
       body.etablissementcontact.length == 0||
       body.categorieetablissement==null||
       body.localite==null
     ) {
       console.log(body);
       throw new BadRequestException({
         message: 'certains champs obligatoires sont manquants',
       });
     }
     try {
       return this.etablissementService.add(body);
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
 
   @Put('update/:id')
   async updateEtablissement(
     @Param('id') etablissementid: number,
     @Body() body: Etablissement,
   ) {
      console.log(body);
     if (etablissementid && isNaN(etablissementid)) {
       throw new BadRequestException({
         message: 'etablissementid must be a number',
       });
     }
 
     // ----- verification de l'user en base
     const etablissement: Etablissement[] = await this.etablissementService.get(
      etablissementid,
     );
     if (!etablissement || etablissement.length == 0) {
       throw new HttpException('', HttpStatus.NO_CONTENT);
     }
 
     if (
       body.etablissementemail == null ||
       body.etablissementemail.length == 0 ||
       body.etablissementcontact == null ||
       body.etablissementcontact.length == 0
     ) {
       throw new BadRequestException({
         message: 'certains champs obligatoires sont manquants',
       });
     }
     try {
       return this.etablissementService.update(etablissement[0], body);
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
 
   @Delete('delete/:id') // liste de tous les utilisateurs
   async deleteEtablissement(@Param('id') etablissementid:number
   ) {
     this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
     if (etablissementid && isNaN(etablissementid)) {
       throw new BadRequestException({
         message: 'utilisateur id must be a number',
       });
     }
     // ----- verification de l'user en base
     const etablissement: Etablissement[] = await this.etablissementService.get(etablissementid);
     if (!etablissement || etablissement.length == 0) {
       throw new HttpException('', HttpStatus.NO_CONTENT);
     }
     // ---- FIN
     const etablissementToUpdate: Etablissement = etablissement[0];
     try {
       await this.etablissementService.delete(etablissementToUpdate);
       return 'utilisateur deleted';
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