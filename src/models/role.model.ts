import { Utilisateur } from './utilisateur.model';
import { Column, CreateDateColumn, Entity,Index,OneToMany,PrimaryGeneratedColumn,Unique } from "typeorm";

@Entity()
@Unique(['rolenom'])
export class Role{
@PrimaryGeneratedColumn()
roleid:number;

@Index()
@Column({ unique: true, length: 256 })
rolenom:string;

@Column({ type: 'text', nullable: true })
roledata:string;

@Column({ type: 'boolean', default: true })
roleenable:boolean;

@CreateDateColumn({ update: false })
roledatecreation:Date

//à un role peuvent appartenir plusieurs utilisateurs
 @OneToMany(()=> Utilisateur, (utilisateur) => utilisateur.role)
 utilisateur:Utilisateur[];

 constructor(utilisateur?:Role){
    if(utilisateur){
        for(const test in utilisateur){
            if(Object.prototype.hasOwnProperty.call(utilisateur , test)){
                this[test]=utilisateur[test];
            }
        }
    }
}
}