import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlocService } from 'src/app/services/servicesBloc/bloc.service';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit {
  blocs: any[] | undefined;
  filteredBlocs: any[] = []; // Initialize as an empty array
  searchTerm: string = '';
  p: number = 1;
  itemsPerPage: number = 3;// Adjust the number of items per page as needed
  currentPage: number = 1;
  pageSize: number = 3;
  listFiltredPage : any[]=[];
  listFiltred: any[] = [];



  constructor(private service: BlocService, private router: Router ,private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.service.retrieveBlocs().subscribe(data => {
      this.blocs = data || [];
      this.filteredBlocs = this.blocs.slice();  // Initialisation avec une copie de la liste complète
      this.pagination();
    });
  }


  deleteBloc(idBloc: number) {
    this.service.removeBloc(idBloc).subscribe(data => {
      this.blocs = this.blocs?.filter(bloc => bloc.idBloc !== idBloc);
      this.filteredBlocs = this.filteredBlocs?.filter(bloc => bloc.idBloc !== idBloc);
      this.pagination();
    });

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  confirmDelete(idBloc: number) {
    const isConfirmed = confirm('Are you sure you want to delete this bloc?');
    if (isConfirmed) {
      this.deleteBloc(idBloc);
    }
  }

  updateBloc(idBloc: number) {
    this.router.navigate(['/admin/update', idBloc]);
  }


  filterBlocs() {
    this.filteredBlocs = this.blocs?.filter(bloc =>
      bloc.nomBloc.toLowerCase().includes(this.searchTerm.toLowerCase())
    ) || [];
  }
  goToUpdatePage(idBloc: any): void {
    // Navigate to the update page with the bloc ID
    this.router.navigate(['/admin/update', idBloc]);
}

  onSearchInput(event: Event) {
    console.log('Search input changed');
    if (this.searchTerm.trim() !== '') {
      this.service.searchBlocsByName(this.searchTerm).subscribe((data) => {
        this.filteredBlocs = data;
        console.log('Data received:', data);
        this.pagination(); // Mettre à jour listFiltredPage

      });
    } else {
      this.filteredBlocs = this.blocs!;
      this.pagination(); // Mettre à jour listFiltredPage

    }
  }

  pagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listFiltredPage = this.filteredBlocs.slice(startIndex, endIndex);
  }


  getTotalPages(): number {
    return Math.ceil(this.filteredBlocs.length / this.pageSize);
  }

  getPages(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, index) => index + 1);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault();  // Empêcher le rafraîchissement de la page
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pagination();
      this.cdr.detectChanges();

    }}
}
