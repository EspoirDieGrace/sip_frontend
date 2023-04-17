import { Typeprescripteur } from './../../models/typeprescripteur.model';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { TypeprescripteurService } from "./typeprescripteur.service";

@Controller('typeprescripteur')
export class TypeprescripteurController{
    private readonly logger = new Logger(TypeprescripteurController.name);
    constructor (private typeprescripteurService:TypeprescripteurService){}
///afficher la liste type prescripteur
@Get('getall')
async getAll(@Query('typeprescripteurid')typeprescripteurid){

    this.logger.log('debut liste des utilisateurs');
    if (typeprescripteurid && isNaN(typeprescripteurid)) {
      throw new BadRequestException({
        message: 'utilisateur id doit être un nombre',
      });
    }
    let utilisateurs = [];
    try {
      utilisateurs = await this.typeprescripteurService.get(typeprescripteurid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (utilisateurs.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return utilisateurs;
}


//ajouter un nouveau type prescripteur
@Post('add')
async addTypeprescripteur(@Body() body: Typeprescripteur) {
  console.log(body);

  if (
    body.typeprescripteurlibelle == null ||
    body.typeprescripteurlibelle.length == 0 
  ) {
    console.log(body);
    throw new BadRequestException({
      message: 'certains champs obligatoires sont manquants',
    });
  }
  try {
    return this.typeprescripteurService.add(body);
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

//modification d'un type prescripteur
@Put('update/:id')
async updateTypeprescripteur(
  @Param('id') typeprescripteurid: number,
  @Body() body: Typeprescripteur,
 
  
) {
   console.log(body);
  if (typeprescripteurid && isNaN(typeprescripteurid)) {
    throw new BadRequestException({
      message: 'utilisateur id must be a number',
    });
  }

  // ----- verification de l'user en base
  const tprescripteur: Typeprescripteur[] = await this.typeprescripteurService.get(
    typeprescripteurid,
  );
  if (!tprescripteur || tprescripteur.length == 0) {
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  if (
    body.typeprescripteurlibelle == null ||
    body.typeprescripteurlibelle.length == 0 
  ) {
    console.log(body);
    throw new BadRequestException({
      message: 'certains champs obligatoires sont manquants',
    });
  }
  try {
    return this.typeprescripteurService.update(tprescripteur[0], body);
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

//suppression d'un type prescripteur

@Delete('delete/:id') // supprimer un type prescripteur
  async deleteTypeprescripteur(@Param('id') typeprescripteurid:number
  ) {
    this.logger.log('==== DEBUT SUPPRESSION DUN TYPE PRESCRIPTEUR ====');
    if (typeprescripteurid && isNaN(typeprescripteurid)) {
      throw new BadRequestException({
        message: 'typeprescripteur id must be a number',
      });
    }
    // ----- verification de l'user en base
    const tprescripteur: Typeprescripteur[] = await this.typeprescripteurService.get(typeprescripteurid);
    if (!tprescripteur || tprescripteur.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const tprescripteurToUpdate: Typeprescripteur = tprescripteur[0];
    try {
      await this.typeprescripteurService.delete(tprescripteurToUpdate);
      return 'typeprescripteur deleted';
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