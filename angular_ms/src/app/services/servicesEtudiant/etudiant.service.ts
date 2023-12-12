import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etudiant } from 'src/app/Model/Etudiant';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  updateEtudiant(etudiant: Etudiant) {
    return this.http.put(`${environment.BaseUrl}/etudiant/update`, etudiant);
  }

  getAllEtudiants() {
    return this.http.get<Etudiant[]>(`${environment.BaseUrl}/etudiant/all`);
  }

  getOneEtudiant(idEtudiant: number) {
    return this.http.get<Etudiant>(
      `${environment.BaseUrl}/etudiant/${idEtudiant}`
    );
  }

  deleteEtudiant(idEtudiant: number) {
    return this.http.delete(
      `${environment.BaseUrl}/etudiant/delete/${idEtudiant}`
    );
  }

  updatePassword(idEtudiant: number, password: string) {
    return this.http.put(
      `${environment.BaseUrl}/etudiant/updatePassword/${idEtudiant}/${password}`,
      {}
    );
  }

  updateImage(idEtudiant: number, newImage: any) {
    return this.http.put(
      `${environment.BaseUrl}/etudiant/updateImage/${idEtudiant}`,
      newImage
    );
  }
}
