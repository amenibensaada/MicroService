import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  constructor (public authService: AuthService) {}

  
  onReserveClick() {
    const isStudent = confirm("Êtes-vous un étudiant ?");

    if (isStudent) {
      this.showStudentForm(); // Fonction à appeler pour afficher le formulaire étudiant
    } else {
      alert("Les étudiants peuvent réserver des chambres chez nous. Contactez-nous pour plus d'informations.");
      // Autre action à effectuer si l'utilisateur n'est pas un étudiant
    }
  }

  showStudentForm() {
    // Code pour afficher le formulaire étudiant, par exemple, en redirigeant vers une route spécifique où se trouve le formulaire
    // Vous pouvez utiliser le Router de Angular pour rediriger vers la page du formulaire étudiant ou afficher un composant modal, etc.
  }
}
