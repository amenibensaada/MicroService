import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-layout',
  templateUrl: './etudiant-layout.component.html',
  styleUrls: ['./etudiant-layout.component.css']
})
export class EtudiantLayoutComponent {


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

