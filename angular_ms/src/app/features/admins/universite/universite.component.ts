import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { Foyer } from 'src/app/Model/foyer';
import { Universite } from 'src/app/Model/universite';
import { FoyerService } from 'src/app/services/servicesFoyer/foyer.service';
import { UniversiteService } from 'src/app/services/servicesUniversite/universite.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent {
  universities: any[] = [];

  constructor(private formBuilder: FormBuilder,private router:Router,private http:HttpClient, private universiteService: UniversiteService, private foyerService:FoyerService) { }

  listUniversite: Universite[] = [];
  foyer!:Foyer;
  selectedUniversite: Universite | null = null;
  selectedFoyerId: number | null = null;
  UniversiteForm!: FormGroup;
  rechercheUniversite: string = '';
  listFoyerWithoutUniversite: Foyer[] = [];

  ngOnInit() {
    this.getAllUniversites();
    this.UniversiteForm = this.formBuilder.group({
      nomUniversite: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  getAllUniversites() {
    this.universiteService.getAllUniversites().subscribe((data: Universite[]) => {
      this.listUniversite = data;
    });
  }
  getFoyers() {
    this.universiteService.getAllUniversites().subscribe((data: Universite[]) => {
      this.listUniversite = data;
    });
  }
  deleteUniversity(idUniversite: number) {
    const apiUrl = environment.BaseUrl + `/universite/deleteUniversite/${idUniversite}`;
    this.http.delete(apiUrl).subscribe({
      next: () => {
        console.log('University deleted successfully');
        this.universities = this.universities.filter(
          (uni) => uni.idUniversite !== idUniversite
        );


      },
    });
  }
  confirmDelete(idUniversite: number) {
    const isConfirmed = confirm('Are you sure you want to delete this university?');
    if (isConfirmed) {
      this.deleteUniversity(idUniversite);
      this.router.navigate(['/admin/universite']);
    }
  }

  getFoyersWithoutUniversite() {
    this.foyerService.fetchAllDorms().subscribe((res: Foyer[]) => {
      this.listFoyerWithoutUniversite = res;
    });
  }

  ajouerUniversite() {
    if (this.UniversiteForm.valid) {
      this.universiteService.addUniversite(this.UniversiteForm.value).subscribe((res) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'L\'université a été ajoutée avec succès'
        })

        this.getAllUniversites();
        this.UniversiteForm.reset();
      });
    }
  }

  openEditModal(universite: Universite) {
    this.selectedUniversite = universite;
    this.UniversiteForm.setValue({
      nomUniversite: universite.nomUniversite,
      adresse: universite.adresse
    });
  }

  updateUniversite() {
    if (this.UniversiteForm.valid && this.selectedUniversite) {
      const updatedUniversite: Universite = {
        ...this.selectedUniversite,
        ...this.UniversiteForm.value
      };

      this.universiteService.updateUniversite(updatedUniversite).subscribe((res) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'L\'université a été modifiée avec succès'
        })
        this.getAllUniversites();
      });
    }
  }



  openAffectModal(universite: Universite) {
    this.selectedUniversite = universite;
    this.selectedFoyerId = null;
  }

  affecterFoyerAUniversite() {
    if (this.selectedFoyerId !== null && this.selectedUniversite !== null) {
      this.universiteService.affecterFoyerAUniversite(this.selectedFoyerId, this.selectedUniversite.nomUniversite).subscribe((res: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Le foyer a été affecté avec succès'
        })
        this.getAllUniversites();
      });
    } else {
      console.error('Foyer ID or Université is not selected');
    }
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.universities); // university

        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "sales");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(blob, fileName + EXCEL_EXTENSION);
  }
}
