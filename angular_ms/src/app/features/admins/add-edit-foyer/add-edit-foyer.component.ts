import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { FoyerService } from 'src/app/services/servicesFoyer/foyer.service';

@Component({
  selector: 'app-add-edit-foyer',
  templateUrl: './add-edit-foyer.component.html',
  styleUrls: ['./add-edit-foyer.component.css']
})
export class AddEditFoyerComponent implements OnInit, OnChanges {

  @Input() displayModel: boolean = true;
  @Input() selectedFoyer: any = null;

  @Output() clickclose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addItemEvent = new EventEmitter<any>();
  modalType = "Ajouter";
  stateOptions = [
    { label: 'Fille', value: 'female' },
    { label: 'Garçon', value: 'male' },
  ];
  foyerform = this.fb.group({
    idFoyer: [0],
    nomFoyer: ["", Validators.required],
    capaciteFoyer: [0, Validators.required],
    gerants: ["", Validators.required],
    adresse: ["", Validators.required],
    fillesougarcons: ["", Validators.required],

    contact: [null, [Validators.required,Validators.pattern('^\\+216[0-9]*$')]],
    photo: [null, Validators.required],
        pointgoogle: ["", Validators.required],
  })
  constructor(private fb: FormBuilder, private _DormsFoyer: FoyerService) {

  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.foyerform.patchValue({
      photo: file
    });
    this.foyerform.get('photo')?.updateValueAndValidity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedFoyer) {
      this.foyerform.patchValue(this.selectedFoyer);
      this.modalType = "Modifier";
    }
    else {
      this.foyerform.reset();
      this.modalType = "Ajouter";

    }
  }




  ngOnInit(): void {
  }
  closeModel() {
    this.foyerform.reset();

    this.clickclose.emit(true);
  }
  addFoyer() {

    console.log(this.foyerform.value)
    this._DormsFoyer.addDorms(this.foyerform.value, this.modalType).subscribe(
      response => {
        console.log(response);
        this.addItemEvent.emit(response);
        this.closeModel();
        const msg = this.modalType === 'Ajouter' ? 'Foyer Ajouter' : 'Foyer Modifiee';
        //this.messageservice.add({ severity: 'success', summary: 'success', detail: msg });
      },
      error => {
        console.log('erreur');
       // this.messageservice.add({ severity: 'Error', summary: 'Error', detail: error });

      }
    );
  }

  get nomFoyer() :FormControl{
    return this.foyerform.controls['nomFoyer'] as FormControl;
  }

  get capaciteFoyer() {
    return this.foyerform.controls['capaciteFoyer'];
  }

  get gerants() {
    return this.foyerform.controls['gerants'];
  }

  get adresse() {
    return this.foyerform.controls['adresse'];
  }

  get fillesougarcons() {
    return this.foyerform.controls['fillesougarcons'];
  }

  get contact() {
    return this.foyerform.controls['contact'];
  }

  get photo() {
    return this.foyerform.controls['photo'];
  }
  get pointgoogle() {
    return this.foyerform.controls['pointgoogle'];
  }

}
