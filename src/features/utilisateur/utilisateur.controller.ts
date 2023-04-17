import { UtilisateurService } from './utilisateur.service';
/////crud

import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UtilisateurDto } from 'src/dto/utilisateur.dto';
import { Utilisateur } from 'src/models/utilisateur.model';

@Controller('utilisateur')
export class UtilisateurController {
  private readonly logger = new Logger(UtilisateurController.name);
  constructor(private utilisateurService: UtilisateurService) {}

  //afficher la liste de tous les utilisateurs
  @Get('getall')
  async getAll(@Query('utilisateurid') utilisateurid) {
    this.logger.log('debut liste des utilisateurs');
    if (utilisateurid && isNaN(utilisateurid)) {
      throw new BadRequestException({
        message: 'utilisateur id doit être un nombre',
      });
    }
    let utilisateurs = [];
    try {
      utilisateurs = await this.utilisateurService.get(utilisateurid);
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

  @Post('add')
  async addUtilisateur(@Body() body: Utilisateur) {
    console.log(body);

    if (
      body.utilisateuremail == null ||
      body.utilisateuremail.length == 0 ||
      body.utilisateurpassword == null ||
      body.utilisateurpassword.length == 0 ||
      body.utilisateurcontact == null ||
      body.utilisateurcontact.length == 0||
      body.role==null
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
      
      
    }
    try {
      return this.utilisateurService.add(body);
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
  async updateUtilisateur(
    @Param('id') utilisateurid: number,
    @Body() body: Utilisateur,
   
    
  ) {
     console.log(body);
    if (utilisateurid && isNaN(utilisateurid)) {
      throw new BadRequestException({
        message: 'utilisateur id must be a number',
      });
    }

    // ----- verification de l'user en base
    const users: Utilisateur[] = await this.utilisateurService.get(
      utilisateurid,
    );
    if (!users || users.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.utilisateuremail == null ||
      body.utilisateuremail.length == 0 ||
      body.utilisateurcontact == null ||
      body.utilisateurcontact.length == 0
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.utilisateurService.update(users[0], body);
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
  async deleteUtilisateur(@Param('id') utilisateurid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (utilisateurid && isNaN(utilisateurid)) {
      throw new BadRequestException({
        message: 'utilisateur id must be a number',
      });
    }
    // ----- verification de l'user en base
    const utilisateurs: Utilisateur[] = await this.utilisateurService.get(utilisateurid);
    if (!utilisateurs || utilisateurs.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const utilisateurToUpdate: Utilisateur = utilisateurs[0];
    try {
      await this.utilisateurService.delete(utilisateurToUpdate);
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
