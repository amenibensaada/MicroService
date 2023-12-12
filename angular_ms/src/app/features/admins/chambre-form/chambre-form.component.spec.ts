import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreFormComponent } from './chambre-form.component';

describe('ChambreFormComponent', () => {
  let component: ChambreFormComponent;
  let fixture: ComponentFixture<ChambreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChambreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
