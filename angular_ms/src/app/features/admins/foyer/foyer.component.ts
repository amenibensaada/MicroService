import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {  ConfirmationService, MessageService } from 'primeng/api';
import { FoyerService } from 'src/app/services/servicesFoyer/foyer.service';

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class FoyerComponent implements OnInit, OnDestroy {
  searchtext: string = '';
  listfoyer: any[] = [];
  listFiltred: any[] = [];
  Listuni: any[] = [];
  nomBloc : string ='';
  listFiltredPage : any[]=[];
  displayModel = false;
  selectedFoyer: any = null;
  //searchTerm: any = null;

  currentPage: number = 1;
  pageSize: number = 3;
  showAffecterChamp: boolean = false;
  nomFoyer : string='';
  toastAction: string = '';
  toastAction1: string = '';

  constructor(private _DormsService: FoyerService, private cdr: ChangeDetectorRef) { }




  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  getAll() {
    this._DormsService.fetchAllDorms().subscribe({
      next: (data) => {
        this.listfoyer = data as any[];
        this.listFiltred = this.listfoyer;

        // Appel de la méthode de pagination ici
        this.pagination();
      },
      error: (err) => console.log(err),
    });
  }
  pagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listFiltredPage = this.listFiltred.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.listFiltred.length / this.pageSize);
  }

  getPages(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, index) => index + 1);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault();  // Empêcher le rafraîchissement de la page
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pagination();
    }
  }






  ngOnInit(): void {
    this.getAll();

  }


  showAddModel() {
    this.displayModel = true;
    this.selectedFoyer = null;
    console.log('Bouton Modifier cliqué avec la liste filtrée :',this.displayModel);

  }
  hideAddModel(isClosed: boolean) {
    this.displayModel = !isClosed;

  }
  CalledAPIList(event: any) {
    this.getAll();
  }
  showeditFoyer(foyer: any) {
    this.displayModel = true;
    this.selectedFoyer = foyer;
  }

  // deletefoyer(foyer: any) {
  //   this.confirmationService.confirm({
  //     message: "Êtes-vous sûr de vouloir supprimer ce foyer?",
  //     accept: () => {
  //       this._DormsService.deleteDorms(foyer.idFoyer).subscribe(response => {

  //         this.messageservice.add({ severity: 'success', summary: 'success', detail: "suppression est effectuer " });
  //         this.getAll();
  //       },
  //         error => {
  //           this.messageservice.add({ severity: 'Error', summary: 'Error', detail: error });

  //         })
  //     }
  //   })
  // }
  deleteFoyer(foyer: any): void {
    const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer ce foyer?");

    if (isConfirmed) {
      this._DormsService.deleteDorms(foyer.idFoyer).subscribe(
        (response) => {
          // this.messageservice.add({ severity: 'success', summary: 'success', detail: 'Suppression effectuée' });
          this.getAll();
          this.toastAction='delete'
        },
        error => {
          //this.messageservice.add({ severity: 'error', summary: 'Erreur', detail: error });
        }
      );
    }
  }


  // search() {
  //   this.searchtext != ''
  //     ? (this.listFiltred = this.listFiltred.filter(
  //       (u) => u.nomFoyer == this.searchtext
  //     ))
  //     : (this.listFiltred = this.listfoyer);
  // }
  // universite = [this.getListeUniversity()];

  // getListeUniversity(){
  //   this._DormsService.getuniversity().subscribe({
  //     next: (data) => {
  //       this.Listuni = data as any[];
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }


  search() {
    if (this.searchtext !== '') {
      this._DormsService.fetchDormByName(this.searchtext).subscribe(
        (response) => {
          if (Array.isArray(response)) {
            this.listFiltred = response;
          } else if (typeof response === 'object') {
            // Si la réponse est un objet, le placer dans un tableau
            this.listFiltred = [response];
          } else {
            console.error('Invalid response format during search:', response);
          }
          console.log('Search results:', response);
          this.pagination(); // Mettre à jour listFiltredPage
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Erreur lors de la recherche :', error);
        }
      );
    } else {
      this.listFiltred = this.listfoyer;
      this.pagination(); // Mettre à jour listFiltredPage
    }
  }



   openModal() {
    this.showAffecterChamp = true;
  console.log( this.showAffecterChamp);

  }
  closeModal() {
    this.showAffecterChamp = false;
    this.toastAction1='Affecter';

  }
  validerAffectation(): void {



    if (this._DormsService.fetchDormByName(this.nomFoyer)) {
      console.log('NomBloc:', this.nomBloc);
      console.log('NomFoyer:', this.nomFoyer);

      this._DormsService.affecterblocafoyer(this.nomBloc, this.nomFoyer).subscribe(
        response => {
          console.log('Success response:', response);
         this.closeModal();


        },
        error => {
          console.error('Erreur lors de la requête PUT:', error);
          // Gérer l'erreur ici
        }
      );

    } else {
      console.log('Ce foyer n\'existe pas');
    }
}

}
