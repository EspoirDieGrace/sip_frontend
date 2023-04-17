import { Objectif } from './../../models/objectif.model';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { ObjectifService } from './objectif.service';

@Controller('objectif')
export class ObjectifController{

    private readonly logger = new Logger(Objectif.name)
    constructor(
        private objectifService:ObjectifService
    ){}

     
  @Get('getall')
  async getAll(@Query('objectifid')objectifid){
    this.logger.log('debut liste des utilisateurs');
    if (objectifid && isNaN(objectifid)) {
      throw new BadRequestException({
        message: 'categorie id doit être un nombre',
      });
    }
    let localAttri = [];
    try {
      localAttri = await this.objectifService.get(objectifid);
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
  async addobjectif(@Body() body: Objectif) {
    console.log(body);

    if (
      body.objectiflibelle == null ||
      body.objectiflibelle.length == 0||
      body.utilisateur==null
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
      
      
    }
    try {
      return this.objectifService.add(body);
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
  async updateobjectif(
    @Param('id') objectifid: number,
    @Body() body: Objectif 
  ) {
     console.log(body);
    if (objectifid && isNaN(objectifid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }

    // ----- verification de l'user en base
    const objectif: Objectif[] = await this.objectifService.get(
        objectifid,
    );
    if (!objectif || objectif.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.objectiflibelle == null ||
      body.objectiflibelle.length == 0
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.objectifService.update(objectif[0], body);
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
  async deleteobjectif(@Param('id') objectifid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (objectifid && isNaN(objectifid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }
    // ----- verification de l'user en base
    const objectif: Objectif[] = await this.objectifService.get(objectifid);
    if (!objectif || objectif.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const objectifToUpdate: Objectif = objectif[0];
    try {
      await this.objectifService.delete(objectifToUpdate);
      return 'objectif deleted';
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