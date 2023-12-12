import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/Model/bloc';
import { BlocService } from 'src/app/services/servicesBloc/bloc.service';

@Component({
  selector: 'app-addbloc',
  templateUrl: './addbloc.component.html',
  styleUrls: ['./addbloc.component.css']
})
export class AddblocComponent  implements OnInit {
  constructor(private service: BlocService, private router: Router) {}

  form = new FormGroup({
    nomBloc: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
    capaciteBloc: new FormControl<number | null>(null, [Validators.required,Validators.max(100)]),
  });


  ngOnInit(): void {}




  submit() {
    const data: Bloc = {
      idBloc: null, // ou undefined, selon votre logique
      ...this.form.value
    };

    console.log(data);

    this.service.addBloc(data).subscribe(
      response => {
        console.log('Bloc added successfully', response);
        alert('Bloc added successfully');
        // Ajoutez ici toute logique supplémentaire après l'ajout du bloc
      },
      error => {
        console.error('Error adding Bloc', error);
        alert("le nom du bloc existe deja tu peut choisr un autre nom");  // Affichez le message d'erreur renvoyé par l'API
        // Ajoutez ici toute logique pour gérer les erreurs
      }
    );

    this.router.navigate(['/admin/bloc']); // Ajustez la route en conséquence
  }

}
