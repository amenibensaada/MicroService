import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminsRoutingModule } from './admins-routing.module';
import { ChambreComponent } from './chambre/chambre.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AddRoomFormComponent } from './add-room-form/add-room-form.component';
import { ChambreFormComponent } from './chambre-form/chambre-form.component';
import { ChambreFormUpdateComponent } from './chambre-form-update/chambre-form-update.component';
import { FoyerComponent } from './foyer/foyer.component';
import { AddEditFoyerComponent } from './add-edit-foyer/add-edit-foyer.component';
import { CrudToastDirectiveDirective } from './directive/crud-toast-directive.directive';
import { BlocComponent } from './bloc/bloc.component';
import { UniversiteComponent } from './universite/universite.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddblocComponent } from './addbloc/addbloc.component';
import { AffectationComponent } from './affectation/affectation.component';
import { BlocFormComponent } from './bloc-form/bloc-form.component';
import { BlocFormAddComponent } from './bloc-form-add/bloc-form-add.component';
import { UpdateblocComponent } from './updatebloc/updatebloc.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    ChambreComponent,
    AddRoomFormComponent,
    ChambreFormComponent,
    ChambreFormUpdateComponent,
    FoyerComponent,
    AddEditFoyerComponent,
    CrudToastDirectiveDirective,
    BlocComponent,
    UniversiteComponent,
    EtudiantComponent,
    ReservationComponent,
    AddblocComponent,
    AffectationComponent,
    BlocFormComponent,
    BlocFormAddComponent,
    UpdateblocComponent,


  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminsModule { }
