import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit {
  addRoomForm: FormGroup;
  rooms: any[] = [];
  filteredRooms: any[] = [];
  event: Event | undefined;
  showAffecterChamp: boolean = false;
  currentPage: number = 1;
  pageSize: number = 3;
  listFiltredPage: any[] = [];
  selectedRoom: any;
  nomBloc: string = '';
  idChambre: number = 0;

  private roomsSubscription: Subscription = new Subscription();
  updateForm: any = {
    value: {
      numeroChambre: 0,
      typeC: '',
    },
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.addRoomForm = this.fb.group({
      numeroChambre: ['', Validators.required],
      typeC: ['', Validators.required],
      nomBloc: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getRooms();
  }
  pagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listFiltredPage = this.filteredRooms.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredRooms.length / this.pageSize);
  }

  getPages(): number[] {
    return Array.from(
      { length: this.getTotalPages() },
      (_, index) => index + 1
    );
  }

  changePage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pagination();
    }
  }

  getRooms() {
    const apiUrl = environment.BaseUrl + '/chambre/afficherchambres';
    this.roomsSubscription.add(
      this.http.get<any[]>(apiUrl).subscribe({
        next: (data) => {
          this.rooms = data;
          this.filteredRooms = data;
          this.pagination();
        },
      })
    );
  }

  deleteRoom(roomId: number) {
    const apiUrl = environment.BaseUrl + `/chambre/supprimerchambre/${roomId}`;
    this.http.delete(apiUrl).subscribe({
      next: () => {
        console.log('Room deleted successfully');
      },
    });
    // this.router.navigate(['/acce']);
    window.location.reload();
  }

  confirmDelete(roomId: number) {
    const isConfirmed = confirm('Are you sure you want to delete this room?');
    if (isConfirmed) {
      this.deleteRoom(roomId);
    }
  }

  openUpdateForm(room: any) {
    room.showUpdateForm = true;
    this.updateForm.value = { ...room };
  }
  onSearchChange(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.listFiltredPage = this.rooms.filter(
      (room) =>
        room.numeroChambre.toString().includes(searchTerm) ||
        room.typeC.toLowerCase().includes(searchTerm)
    );
  }

  ngOnDestroy() {
    this.roomsSubscription.unsubscribe();
  }

  openModal(idChambre: number) {
    this.showAffecterChamp = true;
    this.idChambre = idChambre;
  }

  closeModal() {
    this.showAffecterChamp = false;
  }
  selectRoom(room: any) {
    this.selectedRoom = room;
  }
  onChangeBloc(newBloc: any) {
    console.log('newwwww', newBloc.target.value);
    this.nomBloc = newBloc.target.value;
  }

  affecterChambreABloc() {
    const apiUrl =
      environment.BaseUrl +
      `/chambre/affecterchambreabloc/${this.idChambre}/${this.nomBloc}`;
    this.http.put(apiUrl, '').subscribe({
      next: () => {
        console.log('Room assigned to block successfully');
        this.closeModal();
      },
    });
  }
}
