import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreFormUpdateComponent } from './chambre-form-update.component';

describe('ChambreFormUpdateComponent', () => {
  let component: ChambreFormUpdateComponent;
  let fixture: ComponentFixture<ChambreFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChambreFormUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambreFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
