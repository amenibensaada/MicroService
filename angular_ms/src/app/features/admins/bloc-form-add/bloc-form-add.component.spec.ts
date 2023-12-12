import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocFormAddComponent } from './bloc-form-add.component';

describe('BlocFormAddComponent', () => {
  let component: BlocFormAddComponent;
  let fixture: ComponentFixture<BlocFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocFormAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
