import { VenteprodService } from './features/venteprod/venteprod.service';
import { VenteprodController } from './features/venteprod/venteprod.controller';
import { Ventpro } from './models/ventpro.model';
import { ProduitService } from './features/produit/produit.service';
import { ProduitController } from './features/produit/produit.controller';
import { Produit } from './models/produit.model';
import { ProgrammeService } from './features/programme/programme.service';
import { ProgrammeController } from './features/programme/programme.controller';
import { Programme } from 'src/models/programme.model';
import { ObjectifService } from './features/objectif/objectif.service';
import { ObjectifController } from './features/objectif/objectif.controller';
import { Objectif } from './models/objectif.model';
import { Zone } from './models/zone.model';
import { ZoneService } from './features/zone/zone.service';
import { Localiteattribut } from './models/localiteattribut.model';
import { LocaliteService } from './features/localite/localite.service';
import { Localite } from './models/localite.model';
import { Etablissement } from './models/etablissement.model';
import { EtablissementService } from './features/etablissement/etablissement.service';
import { Prescripteur } from './models/prescripteur.model';
import { Typeprescripteur } from './models/typeprescripteur.model';
import { TypeprescripteurService } from './features/typeprescripteur/typeprescripteur.service';
import { TypeprescripteurController } from './features/typeprescripteur/typeprescripteur.controller';
import { Role } from './models/role.model';
import { RoleService } from './features/role/role.service';
import { RoleController } from './features/role/role.controller';
import { Utilisateur } from './models/utilisateur.model';
import { UtilisateurService } from './features/utilisateur/utilisateur.service';
import { LocaliteController } from './features/localite/localite.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { EtablissementController } from './features/etablissement/etablissement.controller';
import { LocaliteattributController } from './features/localiteattribut/localiteattribut.controller';
import { UtilisateurController } from './features/utilisateur/utilisateur.controller';
import { ZoneController } from './features/zone/zone.controller';
import entities from './models/_index';
import { CategorieetablissementController } from './features/catetablissement/catetablissement.controller';
import { CategorieetablissementService } from './features/catetablissement/catetablissement.service';
import { Repository } from 'typeorm';
import { Catetablissement } from './models/catetablissement.model';
import { PrescripteurController } from './features/prescripteur/prescripteur.controller';
import { PrescripteurService } from './features/prescripteur/prescripteur.service';
import { LocaliteattributService } from './features/localiteattribut/localiteattribut.service';
import { PlanningController } from './features/planning/planning.contoller';
import { PlanningService } from './features/planning/planning.service';
import { Planning } from './models/planning.model';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: "postgres",
      password: "Graceespoir01",
      port: 5432,
      host: "localhost",
      database: "sipp_db",
      synchronize: true,
      entities: entities,
    }),
    TypeOrmModule.forFeature([Role,
      Utilisateur,
      Catetablissement,
      Typeprescripteur,
      Prescripteur,
      Etablissement,
      Localite,
      Localiteattribut,
      Zone,
      Objectif,
      Programme,
      Planning,
      Produit,
      Ventpro])
  ],
  controllers: [
    AppController,
    ZoneController,
    LocaliteattributController,
    EtablissementController,
    LocaliteController,
    UtilisateurController,
    CategorieetablissementController,
    RoleController,
    TypeprescripteurController,
    PrescripteurController,
    LocaliteController,
    LocaliteattributController,
    ZoneController,
    ObjectifController,
    ProgrammeController,
    PlanningController,
    ProduitController,
    VenteprodController
  ],
  providers: [
    UtilisateurService,
    CategorieetablissementService,
    RoleService,
    TypeprescripteurService,
    PrescripteurService,
    EtablissementService,
    LocaliteService,
    LocaliteattributService,
    ZoneService,
    ObjectifService,
    ProgrammeService,
    PlanningService,
    ProduitService,
    VenteprodService
  ],
})
export class AppModule { }
