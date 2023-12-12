import { Component } from '@angular/core';
import { Etudiant } from 'src/app/Model/Etudiant';
import { EtudiantService } from 'src/app/services/servicesEtudiant/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css'],
})
export class EtudiantComponent {
  constructor(public etudiantService: EtudiantService) {}

  listEtudiant: Etudiant[] = [];
  rechercheEtudiant: string = '';

  ngOnInit() {
    this.getAllEtudiants();
  }

  getAllEtudiants() {
    this.etudiantService.getAllEtudiants().subscribe((res: any) => {
      this.listEtudiant = res;
    });
  }
}
