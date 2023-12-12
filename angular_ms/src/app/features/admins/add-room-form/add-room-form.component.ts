import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrls: ['./add-room-form.component.css']
})
export class AddRoomFormComponent {
  image = './assets/chambres/updateRoomchambre.png';
  title = 'Create Room';
  buttonText = 'Add Room';
  placeholder = 'Room Number';

  rooms: any[] = [];
  addRoomForm: FormGroup;
  formData: any = {
    numeroChambre: '',
    typeC: '',
  };
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.addRoomForm = this.fb.group({
      numeroChambre: ['', Validators.required],
      typeC: ['', Validators.required],
    });
  }
  addRoom(formData: any) {
    const apiUrl = environment.BaseUrl + '/chambre/ajouterchambre';
    this.http.post<any>(apiUrl, formData).subscribe({
      next: (data) => {
        this.rooms.push(data);
        this.addRoomForm.reset();
        this.router.navigate(['/admin/chambre']);
      },
    });
  }
}
