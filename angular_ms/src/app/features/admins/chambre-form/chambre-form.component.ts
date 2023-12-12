import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chambre-form',
  templateUrl: './chambre-form.component.html',
  styleUrls: ['./chambre-form.component.css']
})
export class ChambreFormComponent {
  @Input() image = '';
  @Input() buttonText = '';
  @Input() titre = '';
  @Input() roomNum = '';
  @Input() typeRoom = '';
  @Input() formData: any;
  @Input() placeholderNum = '';
  @Input() placeholderType = '';

  @Output() submitForm = new EventEmitter<any>();

  constructor() {}

  onSubmit(roomnumber: string, typeRoom: string) {
    this.submitForm.emit({ numeroChambre: roomnumber, typeC: typeRoom });
  }



}
