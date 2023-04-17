import { Planning } from './planning.model';
import { Objectif } from './objectif.model';
import { Produit } from './produit.model';
import { Programme } from './programme.model';
import { Role } from './role.model';
import { Catetablissement } from './catetablissement.model';
import { Localite } from './localite.model';
import { Etablissement } from './etablissement.model';
import { Localiteattribut } from './localiteattribut.model';
import { Utilisateur } from "./utilisateur.model";
import { Zone } from "./zone.model";
import { Prescripteur} from "./prescripteur.model";
import { Typeprescripteur} from "./typeprescripteur.model"
import { Ventpro } from './ventpro.model';

export default [
    Utilisateur,
    Zone,
    Localiteattribut,
    Etablissement,
    Localite,
    Catetablissement,
    Role,
    Prescripteur,
    Typeprescripteur,
    Programme,
    Produit,
    Objectif,
    Planning,
    Ventpro

]