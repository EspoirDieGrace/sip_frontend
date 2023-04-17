  import { PrescripteurService } from './prescripteur.service';
import { Controller, Logger, Get, Query, BadRequestException, InternalServerErrorException, HttpException, HttpStatus, Body, Post, Param, Put, ConflictException, Delete} from "@nestjs/common";
import { Prescripteur } from 'src/models/prescripteur.model';

@Controller('prescripteur')
export class PrescripteurController{
    private readonly logger=new Logger(PrescripteurController.name);
    constructor(private prescripteurService:PrescripteurService){}
///Afficher la liste des prescripteur
@Get('getall')
async getAll(@Query('precripteurid')prescripteurid){
    this.logger.log('debut liste des prescripteurs')
;
if(prescripteurid && isNaN(prescripteurid)){
    throw new BadRequestException({
        message:'prescripteurid doit être un nombre'
    })
}
let prescripteurs =[];
try{
     prescripteurs = await this.prescripteurService.get(prescripteurid)
    }catch(error){
        throw new InternalServerErrorException({
            message:'Erreur interne'
        })
    }
    if(prescripteurs.length==0){
        throw new HttpException('',HttpStatus.NO_CONTENT)
    }
    return prescripteurs;
}

@Post('add')
async addPrescripteur(@Body() body :Prescripteur){
    console.log(body)
    if(body.prescripteurcontact==null||
        body.prescripteurcontact.length==0||
        body.prescripteuremail==null||
        body.prescripteuremail.length==0||
        body.prescripteurnom==null ||
        body.prescripteurnom.length==0||
        body.prescripteurprenom==null ||
        body.prescripteurprenom.length==0||
        body.typeprescripteur==null){
            console.log(body);
            throw new BadRequestException({
                message:'certains champs manquants sont obligtoires'
            })
    }
    try {
        return this.prescripteurService.add(body);
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
  @Param('id') prescripteurid: number,
  @Body() body: Prescripteur,
 
  
) {
   console.log(body);
  if (prescripteurid && isNaN(prescripteurid)) {
    throw new BadRequestException({
      message: 'utilisateur id must be a number',
    });
  }

  // ----- verification de l'user en base
  const prescripteurs: Prescripteur[] = await this.prescripteurService.get(
    prescripteurid,
  );
  if (!prescripteurs || prescripteurs.length == 0) {
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  if (
    body.prescripteurcontact==null||
    body.prescripteurcontact.length==0||
    body.prescripteuremail==null||
    body.prescripteuremail.length==0
  ) {
    throw new BadRequestException({
      message: 'certains champs obligatoires sont manquants',
    });
  }
  try {
    return this.prescripteurService.update(prescripteurs[0], body);
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
  async deletePrescripteur(@Param('id') prescripteurid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (prescripteurid && isNaN(prescripteurid)) {
      throw new BadRequestException({
        message: 'utilisateur id must be a number',
      });
    }
    // ----- verification de l'user en base
    const prescripteurs: Prescripteur[] = await this.prescripteurService.get(prescripteurid);
    if (!prescripteurs || prescripteurs.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const prescripteurToUpdate: Prescripteur = prescripteurs[0];
    try {
      await this.prescripteurService.delete(prescripteurToUpdate);
      return 'prescripteur deleted';
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