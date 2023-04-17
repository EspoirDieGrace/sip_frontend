import { Localite } from './../../models/localite.model';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { LocaliteService } from './localite.service';
import { Catetablissement } from 'src/models/catetablissement.model';

@Controller('localite')
export class LocaliteController {
  private readonly logger = new Logger(LocaliteController.name)
  constructor(
    private localiteService:LocaliteService
  ) {}


  @Get('getall')
  async getAll(@Query('localiteid')localiteid){
    this.logger.log('debut liste des localites');
    if (localiteid && isNaN(localiteid)) {
      throw new BadRequestException({
        message: 'categorie id doit être un nombre',
      });
    }
    let localite = [];
    try {
      localite = await this.localiteService.get(localiteid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (localite.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return localiteid;
  }

  @Post('add')
  async addLocalite(@Body() body: Localite) {
    console.log(body);

    if (
      body.localitelibelle == null ||
      body.localitelibelle.length == 0||
      body.zone==null||
      body.localiteattribut==null
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
      
      
    }
    try {
      return this.localiteService.add(body);
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
  async updateLocalite(
    @Param('id') localiteid: number,
    @Body() body: Localite 
  ) {
     console.log(body);
    if (localiteid && isNaN(localiteid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }

    // ----- verification de l'user en base
    const localite: Localite[] = await this.localiteService.get(
      localiteid,
    );
    if (!localite || localite.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.localitelibelle == null ||
      body.localitelibelle.length == 0||
      body.zone==null||
      body.localiteattribut==null
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.localiteService.update(localite[0], body);
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
  async deleteLocalite(@Param('id') localiteid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (localiteid && isNaN(localiteid)) {
      throw new BadRequestException({
        message: 'localite id must be a number',
      });
    }
    // ----- verification de l'user en base
    const localite: Localite[] = await this.localiteService.get(localiteid);
    if (!localite || localite.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const localiteToUpdate: Localite = localite[0];
    try {
      await this.localiteService.delete(localiteToUpdate);
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