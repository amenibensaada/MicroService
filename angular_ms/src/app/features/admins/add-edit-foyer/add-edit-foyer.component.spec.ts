import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFoyerComponent } from './add-edit-foyer.component';

describe('AddEditFoyerComponent', () => {
  let component: AddEditFoyerComponent;
  let fixture: ComponentFixture<AddEditFoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
