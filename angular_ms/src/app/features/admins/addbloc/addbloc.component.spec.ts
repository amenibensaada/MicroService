import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddblocComponent } from './addbloc.component';

describe('AddblocComponent', () => {
  let component: AddblocComponent;
  let fixture: ComponentFixture<AddblocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddblocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddblocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
