import{IsDefined, IsInt, IsNotEmpty, ValidateIf} from 'class-validator'
export class UtilisateurDto{
    @ValidateIf((o)=>!o.utilisateurnom)
    @IsDefined()
    @IsInt()
    utilisateurid:number;
    utilisateurdatenaissance:Date;
    utilisateurdatecreation:Date;

    @ValidateIf((o)=>!o.utilisateurid)
    @IsNotEmpty()
    @IsDefined()
    utilisateurnom:string;
    utilisateurprenom:string;
    utilisateurpassword:string;
    utilisateurcontact:string;
    utilisateuremail:string;
    utilisateurenable:boolean
}

