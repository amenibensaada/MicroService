import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Bloc } from 'src/app/Model/bloc';
import { BlocService } from 'src/app/services/servicesBloc/bloc.service';

@Component({
  selector: 'app-updatebloc',
  templateUrl: './updatebloc.component.html',
  styleUrls: ['./updatebloc.component.css']
})
export class UpdateblocComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private service: BlocService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomBloc: ['', [Validators.required]],
      capaciteBloc: [null, [Validators.required, Validators.min(1)]]
    });

    const blocId = +this.route.snapshot.paramMap.get('idBloc')!;
    console.log(this.route.snapshot.paramMap);
    console.log(blocId);


      this.service.retrieveBloc(blocId).subscribe({
        next: (data) => this.onUserExist(data) })
          // Update form controls with existing data

      }
      onUserExist(bloc: Bloc) {
        if (bloc) {
          this.form.patchValue({
            nomBloc: bloc.nomBloc,
            capaciteBloc: bloc.capaciteBloc
          });

      }


    }


    submit() {
      const blocId = +this.route.snapshot.paramMap.get('idBloc')!;
      const updatedBloc = this.form.value;

      this.service.updateUser(blocId, updatedBloc).subscribe(
        response => {
          console.log('Bloc updated successfully', response);
          // Handle success, e.g., display a success message
        },
        error => {
          console.error('Error updating Bloc', error);
          // Handle error, e.g., display an error message
        }

      );
      this.router.navigate(['/admin/bloc']); // Adjust the route accordingly
    }







}
