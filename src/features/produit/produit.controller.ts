import { Produit } from './../../models/produit.model';
import { ProduitService } from './produit.service';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Logger, Param, Post, Put, Query } from "@nestjs/common";

@Controller('produit')
export class ProduitController{
    private readonly logger = new Logger(ProduitController.name)
    constructor(
        private produitService: ProduitService
    ){}
 
    
    
  @Get('getall')
  async getAll(@Query('produitid')produitid){
    this.logger.log('debut liste des produits');
    if (produitid && isNaN(produitid)) {
      throw new BadRequestException({
        message: 'categorie id doit être un nombre',
      });
    }
    let produit = [];
    try {
        produit = await this.produitService.get(produitid);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Erreur interne',
      });
    }
    if (produit.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return produit;
  }

  @Post('add')
  async addproduit(@Body() body: Produit) {
    console.log(body);

    if (
      body.produitlibelle == null ||
      body.produitlibelle.length == 0||
      body.produitdescription== null||
      body.produitdescription.length==0
    ) {
      console.log(body);
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
      
      
    }
    try {
      return this.produitService.add(body);
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
  async updateproduit(
    @Param('id') produitid: number,
    @Body() body: Produit 
  ) {
     console.log(body);
    if (produitid && isNaN(produitid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }

    // ----- verification de l'user en base
    const produit: Produit[] = await this.produitService.get(
        produitid,
    );
    if (!produit || produit.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    if (
      body.produitlibelle == null ||
      body.produitlibelle.length == 0||
      body.produitdescription== null||
      body.produitdescription.length==0
    ) {
      throw new BadRequestException({
        message: 'certains champs obligatoires sont manquants',
      });
    }
    try {
      return this.produitService.update(produit[0], body);
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
  async deleteproduit(@Param('id') produitid:number
  ) {
    this.logger.log('==== DEBUT GET PROFILE OF ONE USER ====');
    if (produitid && isNaN(produitid)) {
      throw new BadRequestException({
        message: 'categorie id must be a number',
      });
    }
    // ----- verification de l'user en base
    const produit: Produit[] = await this.produitService.get(produitid);
    if (!produit || produit.length == 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    // ---- FIN
    const produitToUpdate: Produit = produit[0];
    try {
      await this.produitService.delete(produitToUpdate);
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