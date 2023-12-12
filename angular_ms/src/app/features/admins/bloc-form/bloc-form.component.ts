import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bloc-form',
  templateUrl: './bloc-form.component.html',
  styleUrls: ['./bloc-form.component.css']
})
export class BlocFormComponent {
  @Input() image = '';
  @Input() buttonText = '';
  @Input() titre = '';
  @Input() nomBloc = '';
  @Input() capaciteBloc: number | null = null;
  @Input() form: any;
  @Input() placeholderNum = '';
  @Input() placeholderType = '';

  @Output() submitForm = new EventEmitter<any>();
  constructor() {}

  onSubmit(nomBloc: string, capaciteBloc: number) {
    this.submitForm.emit({ nomBloc: this.nomBloc, capaciteBloc: this.capaciteBloc || 0 });
  }

}
