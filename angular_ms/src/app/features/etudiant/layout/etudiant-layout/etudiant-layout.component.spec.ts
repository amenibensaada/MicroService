import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantLayoutComponent } from './etudiant-layout.component';

describe('EtudiantLayoutComponent', () => {
  let component: EtudiantLayoutComponent;
  let fixture: ComponentFixture<EtudiantLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
