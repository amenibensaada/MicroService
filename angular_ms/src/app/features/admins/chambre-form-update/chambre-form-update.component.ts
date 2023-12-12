import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-chambre-form-update',
  templateUrl: './chambre-form-update.component.html',
  styleUrls: ['./chambre-form-update.component.css']
})
export class ChambreFormUpdateComponent implements OnInit {
  rooms: any[] = [];
  image = './assets/chambres/updateRoomchambre.png';
  title = 'Update Room';
  buttonText = 'Update Room';
  id: string = '';
  room: any = {};

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.GetOneRoom(this.id);
  }

  updateRoom(RoomData: any) {
    const apiUrl = environment.BaseUrl + '/chambre/modifierchambre';
    this.http.put<any>(apiUrl, { ...RoomData, idChambre: this.id }).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/chambre']);
      },
    });
  }
  GetOneRoom(id: string) {
    const apiUrl = environment.BaseUrl + '/chambre/afficherchambre/' + this.id;
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        this.room = data;
      },
    });
  }

  onUpdateForm(room: any) {
    room.showUpdateForm = true;
  }
}
