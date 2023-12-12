import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EtudiantGuardGuard } from './guards/etudiant/etudiant-guard.guard';
import { AdminGuardGuard } from './guards/admin/admin-guard.guard';
import { Error404ComponentComponent } from './error404-component/error404-component.component';

const routes: Routes = [
  { path: "", redirectTo: "acceuil", pathMatch: "full" },
  {path: 'acceuil', component: AcceuilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'etudiant',canActivate:[ EtudiantGuardGuard , EtudiantGuardGuard], loadChildren:()=>import('./features/etudiant/etudiant.module').then(x => x.EtudiantModule) },
  { path: 'admin',canActivate:[ AdminGuardGuard , AdminGuardGuard], loadChildren:()=>import('./features/admins/admins.module').then(a => a.AdminsModule) },
  { path: '**', component:Error404ComponentComponent },
  {path: 'navbar', component: NavbarComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule { }
