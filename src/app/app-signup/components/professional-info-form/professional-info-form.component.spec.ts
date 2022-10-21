import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalInfoFormComponent } from './professional-info-form.component';

describe('ProfessionalInfoFormComponent', () => {
  let component: ProfessionalInfoFormComponent;
  let fixture: ComponentFixture<ProfessionalInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
