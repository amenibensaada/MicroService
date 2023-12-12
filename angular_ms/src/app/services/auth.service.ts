import { Injectable } from '@angular/core';
import { User } from '../Model/User';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { LoginPayload } from '../Model/login-playload';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  registerEtudiant(formData: FormData) {
    return this.http.post(`${environment.BaseUrl}/auth/registerEtudiant`, formData);
  }

  login(user: LoginPayload) {
    return this.http.post(`${environment.BaseUrl}/auth/login`, user);
  }

  forgetPassword(email: string) {
    return this.http.post(`${environment.BaseUrl}/auth/forgetpassword?email=${email}`,{});
  }

  resetPassword(passwordResetToken: string, newPassword: string) {
    return this.http.post(`${environment.BaseUrl}/auth/resetPassword/${passwordResetToken}?newPassword=${newPassword}`, {});
  }
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  isAdmin(): Boolean {
    if (!this.roles)
      //this.roles== undefiened
      return false;
    return this.roles.indexOf('ADMIN') > -1;
  }
  
}
