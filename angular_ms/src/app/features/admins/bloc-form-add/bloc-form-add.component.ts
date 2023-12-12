import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/Model/bloc';
import { BlocService } from 'src/app/services/servicesBloc/bloc.service';

@Component({
  selector: 'app-bloc-form-add',
  templateUrl: './bloc-form-add.component.html',
  styleUrls: ['./bloc-form-add.component.css']
})
export class BlocFormAddComponent {
  image = './assets/chambres/updateRoomchambre.png';
  title = 'Create Bloc';
  buttonText = 'Add bloc';
  placeholder = 'nom bloc';

  blocs: any[] = [];


  constructor(private service: BlocService, private router: Router) {}

 // form = new FormGroup({
   // nomBloc: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
    //capaciteBloc: new FormControl<number | null>(null, [Validators.required,Validators.max(100)]),
  //});
  form: any = {
    nomBloc: '',
    capaciteBloc: null,
  };

  ngOnInit(): void {}






  submit() {
    console.log('Form values:', this.form);
    const data: Bloc = {
      idBloc: null,
      ...this.form
    };

    console.log('Data to be submitted:', data);

    this.service.addBloc(data).subscribe({
      next: (response) => {
        console.log('Bloc added successfully', response);
        this.router.navigate(['/admin/bloc']);
      },
      error: (error) => {
        console.error('Error adding Bloc', error);
      }
    });
  }

}
