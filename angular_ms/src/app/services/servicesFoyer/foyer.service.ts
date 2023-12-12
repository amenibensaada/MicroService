import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foyer } from 'src/app/Model/foyer';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  apiUrl = environment.BaseUrl+"/foyer/";
  apiUrl2 = environment.BaseUrl+"/bloc/";
  constructor(private _http: HttpClient) { }
  // fetchNbInList(list: any, attribute: string, attributeVal: string) {
  //   return list.filter((e: any) => e[attribute] === attributeVal).length;
  // }
//getALL
  fetchAllDorms() {
    return this._http.get<[any]>(this.apiUrl);
  }
//getById
  fetchDormById(id: number) {
    return this._http.get<any>(this.apiUrl+"afficherfoyer/" + id);
  }


  fetchDormByName(nomFoyer: string) {
    return this._http.get<any[]>(this.apiUrl + 'findFoyerByNomFoyer/' + nomFoyer);
  }
  //add et modifier
  addDorms(body: any, modelType: string) {
    if( modelType ==='Ajouter'){
           return this._http.post(this.apiUrl+"ajouterfoyer", body);}
  else{
    const foyerId = body.idFoyer;
     return this._http.put(`${this.apiUrl}modifierfoyer/${foyerId}`, body);

  }
  }
// delete by id
  deleteDorms(id: number) {
    return this._http.delete(this.apiUrl+"deletefoyer/" + id);
   // return this._http.delete(`${this.apiUrl}deletefoyer/${id}`);

  }



  //service avance
affecterblocafoyer(nomfoyer : any,nombloc:any){
  //return this._http.put<any>(`${this.apiUrl}affecterBlocAFoyer/${nomfoyer}/${nombloc}`, {});
  return this._http.put(this.apiUrl2 +"affecterBlocAFoyer/"+ nomfoyer+"/"+nombloc, {});
}
// updateUser(id: number, body: User) {
//   return this._http.put(this.apiUrl + id, body);
// }
// getuniversity(){
//   return this._http.get<[any]>(this.apiUrl+"afficherAll");

// }
}
