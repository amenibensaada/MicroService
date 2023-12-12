import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginPayload } from '../Model/login-playload';
import { Role } from '../Model/role.enum';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    const payload: LoginPayload = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    };

    this.authService.login(payload).subscribe((res: any) => {
      console.log(res);

      if (res && res.userDetails && res.userDetails.enabled) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Connexion réussie'
        });

        localStorage.setItem('userconnect', JSON.stringify(res.userDetails));
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem("state", "0");

        if (res.userDetails.role === Role.ADMIN) {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('etudiant/etudiant-profile');
        }
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Login failed. Please check your credentials.',
        showConfirmButton: true
      });
    });
  }
}
