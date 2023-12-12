import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chambre } from 'src/app/Model/chambre';
import { BlocService } from 'src/app/services/servicesBloc/bloc.service';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  blocs: any[] = [];
  chambres: Chambre[] = [];
  selectedBloc: string = '';
  selectedChambre: number = 0;
  blocSature: boolean = false;
  showDesaffectationForm: boolean = false;
  affectationResult: string | null = null; // Vous pouvez initialiser avec une valeur par défaut
  desaffectationResult: string | null = null; // Vous pouvez initialiser avec une valeur par défaut

    // Ajoutez une nouvelle propriété pour la désaffectation
    selectedChambreDesaffectation: { numeroChambre: number } = { numeroChambre: 0 };

  constructor(private blocService: BlocService ,    private router: Router,private cdRef: ChangeDetectorRef) {
    this.selectedChambreDesaffectation = { numeroChambre: 0 }; // Assurez-vous d'initialiser correctement la valeur ici.

  }

  ngOnInit(): void {
    this.blocService.retrieveBlocs().subscribe(data => {
      this.blocs = data;
      },
      (error) => {
        console.error('Error retrieving blocks', error);
      }
    );

    this.blocService.retrieveChambres().subscribe(data => {
      this.chambres = data;
      },
      (error) => {
        console.error('Error retrieving rooms', error);
      }
    );
  }
  

  onSubmit() {

    console.log('Before Affectation - affectationResult:', this.affectationResult);

    const numChambres: number[] = [this.selectedChambre];
    const nomBloc: string = this.selectedBloc;


    this.blocService.affecterChambresABloc(numChambres, nomBloc).subscribe(
        (response) => {
            console.log('Selected Block:', this.selectedBloc);
            console.log('Selected Room:', this.selectedChambre);

            const updatedBloc = this.blocs.find(bloc => bloc.nomBloc === this.selectedBloc);
            console.log('old Capacity:', updatedBloc.capaciteBloc);

            if (updatedBloc) {
                console.log('Updated Capacity:', updatedBloc.capaciteBloc-1);
                console.log('Sature:', updatedBloc.sature);

                if (updatedBloc.capaciteBloc <= 0 || (updatedBloc.sature && updatedBloc.capaciteBloc > 0)) {
                  // Impossible d'affecter une chambre. Le bloc est saturé.
                  alert('Impossible d\'affecter une chambre. Le bloc est saturé.');
                  this.affectationResult = 'failure';
                    this.cdRef.detectChanges();
                    setTimeout(() => {
                      this.router.navigate(['/admin/bloc']);
                    }, 2000);

              } else {
                    // Affectation réussie
                    alert('Affectation réussie!');
                    console.log('Valeur de affectationResult après l\'affectation :', this.affectationResult);

                    this.affectationResult = 'success';
                    this.cdRef.detectChanges();
                    setTimeout(() => {
                      this.router.navigate(['/admin/bloc']);
                    }, 2000);
                  }
                }

              },
              (error) => {
                console.error('Error during affectation:', error);
              }

    );

    // Vous pouvez conserver cette navigation ici ou la déplacer selon vos besoins
    //this.router.navigate(['bloc']);
}
onDesaffectation() {
  if (this.selectedChambreDesaffectation && this.selectedChambreDesaffectation.hasOwnProperty('numeroChambre')) {
    const numeroChambre: number | undefined = this.selectedChambreDesaffectation.numeroChambre;

    // Check if numeroChambre property exists and is not undefined
    if (numeroChambre !== undefined) {
      // Appel du service avec un seul numéro de chambre
      this.blocService.desaffecterChambresDeBloc([numeroChambre]).subscribe(
        (response) =>  {
          // Traitement de la réponse ici
          console.log('Réponse du service :', response);

          // Ajoutez ici le reste de votre code si nécessaire

          // Exemple générique de traitement
          if (response) {
            if (response.capaciteBloc === 0) {
              // Le bloc est saturé
              console.log('Le bloc est saturé');
            } else {
              // La désaffectation a réussi
              console.log('Désaffectation réussie');
              alert('Désaffectation réussie!');

              this.desaffectationResult = 'sucsses';
                    this.cdRef.detectChanges();
                    setTimeout(() => {
                      this.router.navigate(['/admin/bloc']);
                    }, 2000);


            }
          } else {
            // Une erreur s'est produite
            console.error('Une erreur s\'est produite');
          }
        },
        (error) => {
          // Traitement des erreurs ici
          console.error('Erreur du service :', error);
        }
      );
    } else {
      console.error('numeroChambre property is missing or is undefined in selectedChambreDesaffectation');
    }
  }
  console.log('Type of selectedChambreDesaffectation:', typeof this.selectedChambreDesaffectation);
}



toggleDesaffectationForm() {
    console.log('Before Toggle - showDesaffectationForm:', this.showDesaffectationForm);
    this.showDesaffectationForm = !this.showDesaffectationForm;
    console.log('After Toggle - showDesaffectationForm:', this.showDesaffectationForm);
  }










}
