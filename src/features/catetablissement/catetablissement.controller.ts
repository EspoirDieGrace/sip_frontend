import { Catetablissement } from './../../models/catetablissement.model';
import { CategorieetablissementService } from './catetablissement.service';

import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from '@nestjs/common';

@Controller('categorieetablissement')
export class CategorieetablissementController {
  private readonly logger = new Logger(CategorieetablissementController.name)
  constructor(
    private catetablissementService:CategorieetablissementService
  ) {}

  @Get('getall')
  async getAll(@Query('catetabid')catetabid){
    this.logger.log('debut liste des utilisateurs');
    if (catetabid && isNaN(catetabid)) {
      throw new BadRequestException({
        message: 'categorie id doit être un nombre',
      });
    }
    let catetab = [];
    try {
      catetab = await this.catetablissementService.get(catetabid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (catetab.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return catetab;
  }

  @Post('add')
  async addCateb(@Body() body: Catetablissement) {
    console.log(body);

    if (
      body.catetablibelle == null ||
      body.catetablibelle.length == 0
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
      
      
    }
    try {
      return this.catetablissementService.add(body);
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
  async updatecatetab(
    @Param('id') catetabid: number,
    @Body() body: Catetablissement 
  ) {
     console.log(body);
    if (catetabid && isNaN(catetabid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }

    // ----- verification de l'user en base
    const categorie: Catetablissement[] = await this.catetablissementService.get(
      catetabid,
    );
    if (!categorie || categorie.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.catetablibelle == null ||
      body.catetablibelle.length == 0
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.catetablissementService.update(categorie[0], body);
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
  async deletecatetab(@Param('id') catetabid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (catetabid && isNaN(catetabid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }
    // ----- verification de l'user en base
    const catetab: Catetablissement[] = await this.catetablissementService.get(catetabid);
    if (!catetab || catetab.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const catetabToUpdate: Catetablissement = catetab[0];
    try {
      await this.catetablissementService.delete(catetabToUpdate);
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