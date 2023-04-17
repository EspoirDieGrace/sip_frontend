import { ProgrammeService } from './programme.service';
import { Programme } from './../../models/programme.model';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { Localiteattribut } from 'src/models/localiteattribut.model';

@Controller('programme')
export class ProgrammeController{
    private readonly logger= new Logger(ProgrammeController.name)
    constructor(
        private programmeService:ProgrammeService
    ){}

    @Get('getall')
    async getAll(@Query('programmeid')programmeid){
      this.logger.log('debut liste des utilisateurs');
      if (programmeid && isNaN(programmeid)) {
        throw new BadRequestException({
          message: 'categorie id doit être un nombre',
        });
      }
      let programme = [];
      try {
        programme = await this.programmeService.get(programmeid);
      } catch (error) {
        throw new InternalServerErrorException({
          message: 'Erreur interne',
        });
      }
      if (programme.length == 0) {
        throw new HttpException('', HttpStatus.NO_CONTENT);
      }
      return programme;
    }
  
    @Post('add')
    async addprogramme(@Body() body: Programme) {
      console.log(body);
  
      if (
        body.programmelibelle == null ||
        body.programmelibelle.length == 0||
        body.programmedate==null
      ) {
        console.log(body);
        throw new BadRequestException({
          message: 'certains champs obligatoires sont manquants',
        });
        
        
      }
      try {
        return this.programmeService.add(body);
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
    async updateprogramme(@Param('id') programmeid: number,
      @Body() body: Programme 
    ) {
       console.log(body);
      if (programmeid && isNaN(programmeid)) {
        throw new BadRequestException({
          message: 'categorie id must be a number',
        });
      }
  
      // ----- verification de l'user en base
      const programme: Programme[] = await this.programmeService.get(
        programmeid,
      );
      if (!programme || programme.length == 0) {
        throw new HttpException('', HttpStatus.NO_CONTENT);
      }
  
      if (
        body.programmelibelle == null ||
        body.programmelibelle.length == 0
      ) {
        throw new BadRequestException({
          message: 'certains champs obligatoires sont manquants',
        });
      }
      try {
        return this.programmeService.update(programme[0], body);
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
  
    @Delete('delete/:id') // supprimmer un programme
    async deleteprogramme(@Param('id') programmeid:number
    ) {
      this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
      if (programmeid && isNaN(programmeid)) {
        throw new BadRequestException({
          message: 'categorie id must be a number',
        });
      }
      // ----- verification de l'user en base
      const programme: Programme[] = await this.programmeService.get(programmeid);
      if (!programme || programme.length == 0) {
        throw new HttpException('', HttpStatus.NO_CONTENT);
      }
      // ---- FIN
      const programmeToUpdate: Programme = programme[0];
      try {
        await this.programmeService.delete(programmeToUpdate);
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