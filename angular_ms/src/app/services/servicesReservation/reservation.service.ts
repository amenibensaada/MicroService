import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'src/app/Model/reservation';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  constructor(private http: HttpClient) { }

  ajouterReservation(idChambre: number, cin: number) {
    return this.http.post(`${environment.BaseUrl}/reservation/add/${idChambre}/${cin}`, null);
  }

  updateReservation(reservation: Reservation) {
    return this.http.put(`${environment.BaseUrl}/reservation/update`, reservation);
  }

  getAllReservations() {
    return this.http.get<Reservation[]>(`${environment.BaseUrl}/reservation/all`);
  }

  getReservationById(idReservation: number) {
    return this.http.get<Reservation>(`${environment.BaseUrl}/reservation/${idReservation}`);
  }

  getCurrentReservationByEtudiantId(idEtudiant: number) {
    return this.http.get<Reservation>(`${environment.BaseUrl}/reservation/getReservationsByEtudiantId/${idEtudiant}`);
  }

  annulerReservation(cin: number) {
    return this.http.put(`${environment.BaseUrl}/reservation/annulerReservation/${cin}`, null);
  }
}
