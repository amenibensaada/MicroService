import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Universite } from 'src/app/Model/universite';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {


  constructor(private http: HttpClient) { }

  addUniversite(universite: Universite) {
    return this.http.post(`${environment.BaseUrl}/universite/ajouteruniversite`, universite);
  }

  updateUniversite(universite: Universite) {
    return this.http.put(`${environment.BaseUrl}/universite/modifieruniversite`, universite);
  }

  getAllUniversites() {
    return this.http.get<Universite[]>(`${environment.BaseUrl}/universite/afficheruniversites`);
  }

  getUniversiteById(idUniversite: number) {
    return this.http.get<Universite>(`${environment.BaseUrl}/universite/afficheruniversite/${idUniversite}`);
  }

  affecterFoyerAUniversite(idFoyer: number, nomUniversite: String) {
    return this.http.put(`${environment.BaseUrl}/universite/affecterFoyer/${idFoyer}/${nomUniversite}`, null);
  }

  deleteUniversite(idUniversite: number) {
    return this.http.delete(`${environment.BaseUrl}/universite/deleteUniversite/${idUniversite}`);
  }
/*
  getUniversiteByIdEtudiant(idEtudiant: number) {
    return this.http.get<Universite>(`${environment.BaseUrl}/universite/getUniversiteByIdEtudiant/${idEtudiant}`);
  }

  desaffecterFoyerAUniversite(idUniversite: number) {
    return this.http.put(`${environment.BaseUrl}/universite/desaffecterFoyer/${idUniversite}`, null);
  }*/
}
