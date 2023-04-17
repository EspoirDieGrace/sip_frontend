import { Ventpro } from './../../models/ventpro.model';
import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Post, Query } from "@nestjs/common";
import { VenteprodService } from "./venteprod.service";

@Controller('venteproduit')
export class VenteprodController{
    private readonly logger = new Logger(VenteprodController.name)
    constructor(private venteprodService:VenteprodService){}




    @Get('getall')
async getAll(@Query('ventprodid')ventprodid){

    this.logger.log('debut liste des utilisateurs');
    if (ventprodid && isNaN(ventprodid)) {
      throw new BadRequestException({
        message: 'utilisateur id doit être un nombre',
      });
    }
    let ventprod = [];
    try {
        ventprod = await this.venteprodService.get(ventprodid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (ventprod.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return ventprod;
}


//ajouter un nouveau type prescripteur
@Post('add')
async addventprod(@Body() body: Ventpro) {
  console.log(body);

  if (
    body.ventprodlibelle == null ||
    body.ventprodlibelle.length == 0 ||
    body.ventprodnbre==null||
    body.produit==null||
    body.zone==null
  ) {
    console.log(body);
    throw new BadRequestException({
      message: 'certains champs obligatoires sont manquants',
    });
  }
  try {
    return this.venteprodService.add(body);
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
}