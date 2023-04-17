import { Objectif } from './objectif.model';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from './role.model';


@Entity()
@Unique(['utilisateuremail'])
export class Utilisateur {
    @PrimaryGeneratedColumn()
    utilisateurid : number
    @Column({ length: 124 })
    utilisateurnom : string
    @Column({ length: 256 })
    utilisateurprenom : string
    @Column({ length: 256 })
    utilisateurpassword : string
    @Column({ length: 16 })
    utilisateurcontact : string
    @Column({ length: 124 })
    utilisateuremail : string
    @Column({ type: 'boolean', default:true })
    utilisateurenable : Boolean
    @Column()
    utilisateurdatenaissance : Date
    @CreateDateColumn()
    utilisateurdatecreation : Date
    
    //plusieurs utilisateurs appartiennent à un role
    @ManyToOne(()=> Role,(role)=>role.utilisateur)
    role:Role
    ///un utilisateur peut avoir plusieurs objectif
    @OneToOne(()=>Objectif,(objectif)=>objectif.utilisateur)
    objectif:Objectif[]

    constructor(utilisateur?:Utilisateur){
        if(utilisateur){
            for(const key in utilisateur){
                if(Object.prototype.hasOwnProperty.call(utilisateur))
                {
                    this[key]=utilisateur[key]
                }
            }
        }
    }
}