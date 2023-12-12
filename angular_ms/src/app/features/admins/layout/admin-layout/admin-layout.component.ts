import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {


  constructor(private router:Router) {

  }


  loadScript(src: string) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }

  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/acceuil');
  }

}
