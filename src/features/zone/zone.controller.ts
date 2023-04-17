import { Zone } from './../../models/zone.model';
import { BadRequestException, Body, ConflictException, Delete, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from '@nestjs/common';

import { Controller, Get } from '@nestjs/common';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
  private readonly logger = new Logger(ZoneController.name)
  constructor(
    private zoneService: ZoneService
  ) {}
  
  @Get('getall')
  async getAll(@Query('zoneid')zoneid){
    this.logger.log('debut liste des utilisateurs');
    if (zoneid && isNaN(zoneid)) {
      throw new BadRequestException({
        message: 'categorie id doit être un nombre',
      });
    }
    let zone = [];
    try {
      zone = await this.zoneService.get(zoneid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (zone.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return zone;
  }

  @Post('add')
  async addzone(@Body() body: Zone) {
    console.log(body);
    if (
      body.zonenom == null ||
      body.zonenom.length == 0
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.zoneService.add(body);
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
  async updatezone(
    @Param('id') zoneid: number,
    @Body() body: Zone 
  ) {
     console.log(body);
    if (zoneid && isNaN(zoneid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }

    // ----- verification de l'user en base
    const zone: Zone[] = await this.zoneService.get(
      zoneid,
    );
    if (!zone || zone.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.zonenom == null ||
      body.zonenom.length == 0
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.zoneService.update(zone[0], body);
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
  async deletezone(@Param('id') zoneid:number
  ) {
    this.logger.log('==== DEBUT DELETE ZONE ====');
    if (zoneid && isNaN(zoneid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }
    // ----- verification de l'user en base
    const zone: Zone[] = await this.zoneService.get(zoneid);
    if (!zone || zone.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const zoneToUpdate: Zone = zone[0];
    try {
      await this.zoneService.delete(zoneToUpdate);
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