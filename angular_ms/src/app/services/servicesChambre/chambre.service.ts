import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chambre } from 'src/app/Model/chambre';
import { TypeChambre } from 'src/app/Model/type-chambre.enum';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(private http: HttpClient) { }

  addChambre(chambre: Chambre) {
    return this.http.post(`${environment.BaseUrl}/chambre/add`, chambre);
  }

  updateChambre(chambre: Chambre) {
    return this.http.put(`${environment.BaseUrl}/chambre/update`, chambre);
  }

  getAllChambres() {
    return this.http.get<Chambre[]>(`${environment.BaseUrl}/chambre/all`);
  }

  getChambreById(idChambre: number) {
    return this.http.get<Chambre>(`${environment.BaseUrl}/chambre/${idChambre}`);
  }

  getChambresParBlocEtType(idBloc: number, typeC: TypeChambre) {
    return this.http.get<Chambre[]>(`${environment.BaseUrl}/chambre/getChambresParBlocEtType/${idBloc}/${typeC}`);
  }

  getNombreChambresParBloc(idBloc: number) {
    return this.http.get<number>(`${environment.BaseUrl}/chambre/getNombreChambresParBloc/${idBloc}`);
  }


}
