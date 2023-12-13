import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantProfileComponent } from './etudiant-profile/etudiant-profile.component';
import { EtudiantLayoutComponent } from './layout/etudiant-layout/etudiant-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListReservationComponent } from './list-reservation/list-reservation.component';

@NgModule({
  declarations: [
    EtudiantProfileComponent,
    EtudiantLayoutComponent,
    ListReservationComponent,
  ],
  imports: [CommonModule, EtudiantRoutingModule, ReactiveFormsModule],
})
export class EtudiantModule {}
