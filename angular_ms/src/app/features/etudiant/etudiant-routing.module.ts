import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantLayoutComponent } from './layout/etudiant-layout/etudiant-layout.component';
import { EtudiantProfileComponent } from './etudiant-profile/etudiant-profile.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';


const routes: Routes =  [
  { path: '', component: EtudiantLayoutComponent, children:[
    { path: 'etudiant-profile', component: EtudiantProfileComponent },
    { path: 'list-reservation', component: ListReservationComponent }





  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
