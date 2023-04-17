import { Planning } from './../../models/planning.model';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { PlanningService } from "./planning.service";


@Controller('planning')
export class PlanningController{
    private readonly logger = new Logger(PlanningController.name)
    constructor(
        private planningService:PlanningService
    ){}

      
  @Get('getall')
  async getAll(@Query('planningid')planningid){
    this.logger.log('debut liste des utilisateurs');
    if (planningid && isNaN(planningid)) {
      throw new BadRequestException({
        message: 'categorie id doit être un nombre',
      });
    }
    let planning = [];
    try {
        planning = await this.planningService.get(planningid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (planning.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return planning;
  }

  @Post('add')
  async addplanning(@Body() body: Planning) {
    console.log(body);

    if (
      body.planningdatedebut == null ||
      body.planningdatefin== null
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
      
      
    }
    try {
      return this.planningService.add(body);
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
  async updateplanning(
    @Param('id') planningid: number,
    @Body() body: Planning 
  ) {
     console.log(body);
    if (planningid && isNaN(planningid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }

    // ----- verification de l'user en base
    const planning: Planning[] = await this.planningService.get(
        planningid,
    );
    if (!planning || planning.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.planningdatedebut == null ||
      body.planningdatefin == null
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.planningService.update(planning[0], body);
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
  async deleteplanning(@Param('id') planningid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (planningid && isNaN(planningid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }
    // ----- verification de l'user en base
    const planning: Planning[] = await this.planningService.get(planningid);
    if (!planning || planning.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const planningToUpdate: Planning = planning[0];
    try {
      await this.planningService.delete(planningToUpdate);
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