import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ChambreComponent } from './chambre/chambre.component';
import { ChambreFormComponent } from './chambre-form/chambre-form.component';
import { ChambreFormUpdateComponent } from './chambre-form-update/chambre-form-update.component';
import { AddRoomFormComponent } from './add-room-form/add-room-form.component';
import { FoyerComponent } from './foyer/foyer.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { BlocComponent } from './bloc/bloc.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UniversiteComponent } from './universite/universite.component';
import { AddblocComponent } from './addbloc/addbloc.component';
import { BlocFormComponent } from './bloc-form/bloc-form.component';
import { BlocFormAddComponent } from './bloc-form-add/bloc-form-add.component';
import { AffectationComponent } from './affectation/affectation.component';
import { UpdateblocComponent } from './updatebloc/updatebloc.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent},
   { path: 'chambre', component: ChambreComponent},
   { path: 'formChambre', component: ChambreFormComponent },
   { path: 'formChambreUpdate/:id', component: ChambreFormUpdateComponent },
 { path: 'addChambre', component: AddRoomFormComponent },
 { path: 'foyer', component: FoyerComponent },
 { path: 'etudiant', component: EtudiantComponent },
 { path: 'reservation', component: ReservationComponent },
 { path: 'universite', component: UniversiteComponent },
 { path: 'bloc', component: BlocComponent },
 { path: 'add', component: AddblocComponent },
  { path: 'form', component: BlocFormComponent }, // Nouvelle route pour AffectationComponent
  { path: 'add-form', component: BlocFormAddComponent }, // Nouvelle route pour AffectationComponent
  { path: 'update/:idBloc', component: UpdateblocComponent }, // Nouvelle route pour AffectationComponent


  { path: 'affectation', component: AffectationComponent } // Nouvelle route pour AffectationComponent






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
