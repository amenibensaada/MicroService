
import { Universite } from "../Model/universite";
import { User } from "../Model/User";

export class Etudiant extends User {
    cin!: number;
    universite!: Universite;
    dateNaissance!: Date;
}
