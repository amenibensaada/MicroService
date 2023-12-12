import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from 'src/app/Model/bloc';
import { Chambre } from 'src/app/Model/chambre';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlocService {

  private url = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  // Add User - Create
  addBloc(Bloc: Bloc){
    return this.http.post<Bloc>(`${this.url}/bloc/addBloc`, Bloc)
  }

  // Get Users - Read
  retrieveBlocs(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/bloc/AllBlocs`)
  }

  // Get User by Id - Read
  retrieveBloc(idBloc: number): Observable<Bloc>{
    return this.http.get<Bloc>(`${this.url}/bloc/getBloc/${idBloc}`)
  }

  // Update User - Update
  updateUser(idBloc: number, bloc: Bloc): Observable<any> {
    return this.http.put(`${this.url}/bloc/update2/${idBloc}`, bloc, { responseType: 'text' });
  }

  affecterChambresABloc(numchambre: number[], nomBloc: string): Observable<Bloc> {
    const params = new HttpParams()
      .set('numchambre', numchambre.toString()) // Assurez-vous que numchambre est un tableau, sinon ajustez cette logique
      .set('nomBloc', nomBloc);

    return this.http.post<Bloc>(`${this.url}/bloc/affecterChambresABloc`, null, { params });
  }



  retrieveChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${environment.BaseUrl}/chambre/afficherchambres`);
    
  }

  // Delete User - Delete
  removeBloc(idBloc: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/bloc/removeBloc/${idBloc}`)
  }

  searchBlocsByName(nomBloc: string): Observable<any[]> {
    console.log('searchBlocsByName called');
  return this.http.get<any[]>(`${this.url}/bloc/recherche?nomBloc=${nomBloc}`);
}
desaffecterChambresDeBloc(numChambres: number[]): Observable<any> {
  return this.http.post<any>(`${this.url}/bloc/desaffecterChambresDeBloc`, numChambres);
}



}
