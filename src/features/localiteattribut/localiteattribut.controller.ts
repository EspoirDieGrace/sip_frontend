import { Localiteattribut } from './../../models/localiteattribut.model';

import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { LocaliteattributService } from './localiteattribut.service';

@Controller('localiteattribut')
export class LocaliteattributController {
  private readonly logger = new Logger(LocaliteattributController.name) 
  constructor(
    private localiteattributService:LocaliteattributService
  ) {}

  
  @Get('getall')
  async getAll(@Query('localAttriid')localAttriid){
    this.logger.log('debut liste des utilisateurs');
    if (localAttriid && isNaN(localAttriid)) {
      throw new BadRequestException({
        message: 'categorie id doit être un nombre',
      });
    }
    let localAttri = [];
    try {
      localAttri = await this.localiteattributService.get(localAttriid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (localAttri.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return localAttri;
  }

  @Post('add')
  async addlocalattri(@Body() body: Localiteattribut) {
    console.log(body);

    if (
      body.localAttrilibelle == null ||
      body.localAttrilibelle.length == 0
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
      
      
    }
    try {
      return this.localiteattributService.add(body);
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
  async updatelocalattri(
    @Param('id') localAttriid: number,
    @Body() body: Localiteattribut 
  ) {
     console.log(body);
    if (localAttriid && isNaN(localAttriid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }

    // ----- verification de l'user en base
    const localAttri: Localiteattribut[] = await this.localiteattributService.get(
      localAttriid,
    );
    if (!localAttri || localAttri.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.localAttrilibelle == null ||
      body.localAttrilibelle.length == 0
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.localiteattributService.update(localAttri[0], body);
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
  async deletelocalattri(@Param('id') localAttriid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (localAttriid && isNaN(localAttriid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }
    // ----- verification de l'user en base
    const localAttri: Localiteattribut[] = await this.localiteattributService.get(localAttriid);
    if (!localAttri || localAttri.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const localAttriToUpdate: Localiteattribut = localAttri[0];
    try {
      await this.localiteattributService.delete(localAttriToUpdate);
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